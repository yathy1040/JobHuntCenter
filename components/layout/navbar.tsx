export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Job Hunt Dashboard
        </h1>
        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">User</div>
      </div>
    </nav>
  );
}
