import Link from "next/link";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/ui/icon-well";
import { UploadCvButton } from "@/components/cvs/upload-cv-button";
import { getCvs } from "@/lib/api/resources";
import { formatRelativeTime } from "@/lib/matches/format-time";

export default async function CvsPage() {
  const { items } = await getCvs();

  return (
    <>
      <PageHeader
        title="My CVs"
        description="Versions tailored for different roles and companies."
        actions={<UploadCvButton />}
      />
      {items.length === 0 ? (
        <Card variant="muted" className="p-8 text-center">
          <p className="text-body-sm text-muted-foreground">
            No CVs yet. Upload one to get started.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cv) => (
            <Card key={cv.id} variant="muted" interactive className="p-5">
              <IconWell size="sm" iconClassName="text-primary">
                <FileText className="h-5 w-5" />
              </IconWell>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{cv.name}</h3>
                {cv.isDefault && (
                  <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                    Default
                  </span>
                )}
              </div>
              <p className="mt-1 text-caption">
                Uploaded {formatRelativeTime(cv.uploadedAt)}
              </p>
              <Button variant="ghost" size="sm" className="mt-4" asChild>
                <Link href={`/cvs/${cv.id}`}>Edit</Link>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
