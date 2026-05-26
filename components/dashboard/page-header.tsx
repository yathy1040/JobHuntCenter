export default function PageHeader() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Track applications, interviews, and upcoming actions.
      </p>
      <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
        Add Application
      </button>
    </div>
  );
}
