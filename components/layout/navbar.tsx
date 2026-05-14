export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Dashboard
        </h1>
        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">User</div>
      </div>
    </header>
  );
}
