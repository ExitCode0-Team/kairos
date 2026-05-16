import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-main">
      <Sidebar />
      <Topbar />
      <main className="pl-[200px] pt-12">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
