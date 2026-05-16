import { dataSources, channels } from "@/lib/connectors/data";
import { cn } from "@/lib/utils";

export function IconCloud({ className }: { className?: string }) {
  const icons = [...dataSources, ...channels].map((item) => ({
    id: item.id,
    icon: item.icon,
  }));

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2 py-4", className)}>
      {icons.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-sm",
            i % 3 === 0 && "-mt-2",
            i % 4 === 0 && "opacity-60"
          )}
        >
          <span className="scale-75">{item.icon}</span>
        </div>
      ))}
    </div>
  );
}
