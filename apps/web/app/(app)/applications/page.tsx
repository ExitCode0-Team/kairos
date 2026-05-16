import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GlassCard } from "@/components/ui/glass-card";

const applications = [
  { company: "Figma", role: "Senior Engineer", score: 91, status: "interview" as const },
  { company: "Anthropic", role: "ML Engineer", score: 85, status: "applied" as const },
  { company: "OpenAI", role: "Research Engineer", score: 82, status: "offer" as const },
  { company: "Supabase", role: "Full Stack Engineer", score: 79, status: "applied" as const },
];

const statusVariant = {
  applied: "primary" as const,
  interview: "interview" as const,
  offer: "success" as const,
};

const statusLabel = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Applications"
        description="Track every role you've applied to."
      />
      <GlassCard tier={3} padding="none" className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.company}>
                <TableCell className="font-medium">{app.company}</TableCell>
                <TableCell className="text-muted-foreground">{app.role}</TableCell>
                <TableCell>
                  <Badge variant={app.score >= 80 ? "high" : "medium"}>{app.score}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[app.status]}>{statusLabel[app.status]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </>
  );
}
