import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/ui/icon-well";

const cvs = [
  { name: "Product Designer — General", updated: "2 days ago" },
  { name: "Frontend Engineer — Tailored", updated: "1 week ago" },
  { name: "Full CV — Master", updated: "3 weeks ago" },
];

export default function CvsPage() {
  return (
    <>
      <PageHeader
        title="My CVs"
        description="Versions tailored for different roles and companies."
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create CV
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cvs.map((cv) => (
          <Card key={cv.name} variant="muted" interactive className="p-5">
            <IconWell size="sm" iconClassName="text-primary">
              <FileText className="h-5 w-5" />
            </IconWell>
            <h3 className="mt-4 font-semibold text-foreground">{cv.name}</h3>
            <p className="mt-1 text-caption">Updated {cv.updated}</p>
            <Button variant="ghost" size="sm" className="mt-4" asChild>
              <Link href="#">Edit</Link>
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
