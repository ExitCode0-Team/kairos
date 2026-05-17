// Legacy alias kept for one release while clients migrate to /api/profile/cv.
// TODO(api): remove once nothing references /api/onboarding/cv.
import { POST as ProfileCvPost } from "../../profile/cv/route";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return ProfileCvPost(req);
}
