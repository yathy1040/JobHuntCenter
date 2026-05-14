export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">Dashboard</h1>
        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-300">User</div>
      </div>
    </nav>
  );
}
