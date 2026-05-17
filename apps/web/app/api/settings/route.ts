import { z } from "zod";
import { ApiUnavailable, serverFetch } from "@/lib/api/server";
import { settingsFallback } from "@/lib/api/fallback";
import type { Settings } from "@/lib/api/types";

const SettingsSchema = z.object({
  displayName: z.string().trim().min(1),
  email: z.string().trim().email(),
  notificationChannel: z.enum(["whatsapp", "telegram", "slack", "discord", "email"]),
});

export async function GET() {
  try {
    const { status, json } = await serverFetch<Settings>("/v1/settings");
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      return Response.json(settingsFallback(), { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }
  const parsed = SettingsSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "validation_failed", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const { status, json } = await serverFetch<Settings>("/v1/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (status >= 200 && status < 300) return Response.json(json, { status });
    return Response.json({ error: "upstream_error" }, { status });
  } catch (err) {
    if (err instanceof ApiUnavailable) {
      // No upstream -- just echo back what was sent.
      return Response.json(parsed.data, { status: 200 });
    }
    return Response.json({ error: "upstream_failure" }, { status: 502 });
  }
}
