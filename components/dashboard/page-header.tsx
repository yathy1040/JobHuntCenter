import Link from "next/link";

type PageHeaderProps = {
  showBoardLink?: boolean;
};

export default function PageHeader({ showBoardLink = false }: PageHeaderProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Track applications, interviews, and upcoming actions.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        href="/applications/new">
          Add Application
        </Link>
        {showBoardLink ? (
          <Link
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
            href="/applications/board"
          >
            View Board
          </Link>
        ) : null}
      </div>
    </div>
  );
}
