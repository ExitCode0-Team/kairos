import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/ui/section-shell";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account and preferences." />
      <Card className="mx-auto max-w-2xl space-y-8 p-8">
        <SectionShell title="Profile" description="How you appear in Kairos.">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-label">Display name</label>
              <Input defaultValue="Kairos User" />
            </div>
            <div>
              <label className="mb-1.5 block text-label">Email</label>
              <Input type="email" defaultValue="you@example.com" />
            </div>
          </div>
        </SectionShell>
        <SectionShell title="Notifications" description="Where your agent reaches you.">
          <div>
            <label className="mb-1.5 block text-label">Default channel</label>
            <Select defaultValue="whatsapp">
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
              <option value="slack">Slack</option>
            </Select>
          </div>
        </SectionShell>
        <Button>Save changes</Button>
      </Card>
    </>
  );
}
