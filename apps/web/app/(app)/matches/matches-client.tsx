"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";

type Match = {
  company: string;
  role: string;
  location: string;
  score: number;
  time: string;
};

export function MatchesClient({ initialMatches }: { initialMatches: Match[] }) {
  const [tab, setTab] = useState("all");

  return (
    <>
      <PageHeader
        title="Matches"
        description="Roles scored against your profile — apply when the moment is right."
        actions={<Button>New search</Button>}
      />
      <Tabs
        tabs={[
          { id: "all", label: "All" },
          { id: "high", label: "High match" },
          { id: "new", label: "New today" },
        ]}
        active={tab}
        onChange={setTab}
        className="mb-6 w-fit"
      />
      <div className="space-y-3">
        {initialMatches.map((job) => (
          <Card key={job.company} variant="glass" className="flex items-center gap-4 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/15 font-bold text-primary">
              {job.company[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{job.role}</p>
              <p className="text-body-sm text-muted-foreground">
                {job.company} · {job.location} · {job.time}
              </p>
            </div>
            <Badge variant={job.score >= 80 ? "high" : "medium"}>{job.score}</Badge>
            <Button variant="success" size="sm" className="gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              Apply
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
