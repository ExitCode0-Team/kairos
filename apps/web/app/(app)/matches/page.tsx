import { MatchesClient } from "./matches-client";
import { getMatches } from "@/lib/api/resources";

export default async function MatchesPage() {
  const { items } = await getMatches({ page: 1, pageSize: 50 });
  return <MatchesClient initialMatches={items} />;
}
