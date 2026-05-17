import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/ui/section-shell";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { SettingsForm } from "@/components/settings/settings-form";
import { getSettings } from "@/lib/api/resources";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader title="Settings" description="Manage your account and preferences." />
      <Card className="mx-auto max-w-2xl space-y-8 p-8">
        <SectionShell title="Appearance" description="Choose how Kairos looks.">
          <AppearanceSettings />
        </SectionShell>
        <SettingsForm initial={settings} />
      </Card>
    </>
  );
}
