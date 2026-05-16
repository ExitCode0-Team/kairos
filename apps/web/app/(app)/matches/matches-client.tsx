"use client";

import { useMemo, useState } from "react";
import { Clock, Search, Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { JobPreferencesEditor } from "@/components/preferences/job-preferences-editor";
import { MatchCard } from "@/components/matches/match-card";
import type { Match } from "@/lib/api/types";

type SortOption = "best" | "newest" | "score";

const PAGE_SIZE = 4;

function sortMatches(matches: Match[], sort: SortOption): Match[] {
  const copy = [...matches];
  if (sort === "score") return copy.sort((a, b) => b.score - a.score);
  if (sort === "newest")
    return copy.sort(
      (a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt),
    );
  return copy.sort((a, b) => b.score - a.score);
}

function isPostedToday(iso: string): boolean {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  return Date.now() - t < 24 * 3600 * 1000;
}

export function MatchesClient({ initialMatches }: { initialMatches: Match[] }) {
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState<SortOption>("best");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = initialMatches;
    if (tab === "high") {
      list = list.filter((m) => m.score >= 80);
    } else if (tab === "new") {
      list = list.filter((m) => isPostedToday(m.postedAt));
    }
    return sortMatches(list, sort);
  }, [initialMatches, tab, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const handleTabChange = (id: string) => {
    setTab(id);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Matches"
        description="Roles scored against your profile — apply when the moment is right."
        actions={
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            New search
          </Button>
        }
      />

      <section className="mb-6">
        <JobPreferencesEditor layout="inline" />
      </section>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Tabs
          variant="underline"
          tabs={[
            { id: "all", label: "All" },
            { id: "high", label: "High match", icon: Star },
            { id: "new", label: "New today", icon: Clock },
          ]}
          active={tab}
          onChange={handleTabChange}
        />
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-body-sm text-muted-foreground">Sort by</span>
          <Select
            value={sort}
            onChange={handleSortChange}
            className="h-9 w-auto min-w-[10rem] border-0 bg-transparent pr-8 text-body-sm font-medium shadow-none focus:ring-0"
            aria-label="Sort matches"
          >
            <option value="best">Best match</option>
            <option value="newest">Newest</option>
            <option value="score">Highest score</option>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        {paginated.length === 0 ? (
          <p className="py-8 text-center text-body-sm text-muted-foreground">
            No matches in this view.
          </p>
        ) : (
          paginated.map((job) => <MatchCard key={job.id} match={job} />)
        )}
      </div>

      <Pagination
        className="mt-8"
        page={safePage}
        pageSize={PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPage}
      />
    </>
  );
}
