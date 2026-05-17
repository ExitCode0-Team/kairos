import { z } from "zod";
import { saveProfile } from "@/lib/server/supabase";
import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { profileFallback } from "@/lib/api/fallback";
import type { UserProfile } from "@/lib/api/types";

const ProfileSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  role: z.string().trim().min(2, "Tell me your role (at least 2 characters)."),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill."),
  experience: z.string().optional().default(""),
  projects: z.array(z.string().trim().min(1)).optional().default([]),
  references: z.array(z.string().trim().min(1)).optional().default([]),
});

const PartialProfileSchema = ProfileSchema.partial();

export async function GET() {
  try {
    const { status, json } = await serverFetch<UserProfile>("/v1/profile");
    if (status >= 200 && status < 300) {
      return Response.json(json, { status });
    }
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(profileFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const { status, json } = await serverFetch("/v1/profile", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    return Response.json(json ?? { ok: status < 300 }, { status });
  } catch (err) {
    if (!(err instanceof ApiUnavailable)) {
      return Response.json(
        { ok: false, message: err instanceof Error ? err.message : "Upstream error." },
        { status: 502 },
      );
    }
  }

  try {
    await saveProfile(parsed.data);
  } catch (err) {
    return Response.json(
      { ok: false, message: err instanceof Error ? err.message : "Failed to save profile." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}

export async function PATCH(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = PartialProfileSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const { status, json } = await serverFetch("/v1/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    return Response.json(json ?? profileFallback(), { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      // Without upstream we can't merge -- return the patch echoed onto a blank profile.
      return Response.json({ ...profileFallback(), ...parsed.data }, { status: 200 });
    }
    return Response.json(
      { ok: false, message: err instanceof Error ? err.message : "Upstream error." },
      { status: 502 },
    );
  }
}
