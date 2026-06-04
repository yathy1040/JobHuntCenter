import Link from "next/link";
import ApplicationForm from "@/components/application-form";
import {createApplication} from "@/lib/actions/applications";


export default async function AddApplication() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_32%),linear-gradient(180deg,_#fafafa_0%,_#f4f4f5_100%)] px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Applications
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
              Add Application
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-600">
              Capture the key details for a role so your next step is easy to
              track from the dashboard.
            </p>
          </div>


          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Back to dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <ApplicationForm mode="create" action={createApplication} submitLabel="Create Application" />

          <aside className="rounded-3xl border border-blue-100 bg-blue-50/90 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-950">
              Tracking checklist
            </h2>
            <p className="mt-2 text-sm text-blue-800/80">
              A complete application entry gives you better dashboard metrics and
              clearer next actions.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-blue-950">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  1
                </span>
                Add the company and exact role title from the posting.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  2
                </span>
                Set a pipeline status so the dashboard summary stays accurate.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  3
                </span>
                Write the next action before you move on to another role.
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
