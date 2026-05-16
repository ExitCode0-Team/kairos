import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { MatchesClient } from "./matches-client";

const matches = [
  { company: "Stripe", role: "Senior Frontend Engineer", location: "San Francisco", score: 94, time: "2h ago" },
  { company: "Linear", role: "Staff Engineer, Platform", location: "Remote", score: 89, time: "4h ago" },
  { company: "Vercel", role: "Software Engineer, DX", location: "Remote", score: 86, time: "6h ago" },
  { company: "Notion", role: "Frontend Engineer", location: "New York", score: 78, time: "1d ago" },
];

export default function MatchesPage() {
  return <MatchesClient initialMatches={matches} />;
}
