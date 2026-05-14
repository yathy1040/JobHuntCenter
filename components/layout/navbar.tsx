export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Dashboard</h1>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">User</div>
      </div>
    </header>
  );
}
