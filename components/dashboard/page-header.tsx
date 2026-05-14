export default function PageHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-zinc-200 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Track applications, interviews, and upcoming actions.
        </p>
      </div>
      <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
        Add Application
      </button>
    </div>
  );
}
