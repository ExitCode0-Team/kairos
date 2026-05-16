import { DashboardShell } from "@/components/dashboard/shell";

export default function ConnectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
