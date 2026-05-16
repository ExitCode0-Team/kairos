// Legacy alias kept for one release while clients migrate to /api/profile.
// The chat hook still POSTs here; we treat it as a PUT to /api/profile.
// TODO(api): remove once submit.ts targets /api/profile directly.
import { PUT, PATCH, GET } from "../profile/route";

export { GET, PUT, PATCH };

export async function POST(req: Request) {
  return PUT(req);
}
