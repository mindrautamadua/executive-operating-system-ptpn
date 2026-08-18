import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { LiveFeed } from "./LiveFeed";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh min-w-0 flex-col overflow-hidden bg-[var(--bg-app)]">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
          <Header />
          {children}
        </main>
      </div>
      <LiveFeed />
    </div>
  );
}
