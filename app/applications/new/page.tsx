import Link from "next/link";

const inputStyles =
  "mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
const labelStyles = "text-sm font-semibold text-zinc-800";
const helperTextStyles = "mt-2 text-xs text-zinc-500";

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
          <form className="rounded-3xl border border-zinc-200 bg-white/95 p-6 shadow-xl shadow-zinc-200/70 backdrop-blur sm:p-8">
            <div className="border-b border-zinc-200 pb-6">
              <h2 className="text-2xl font-semibold text-zinc-950">
                Role details
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Start with the company, role, and current pipeline status.
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className={labelStyles}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Acme Corp"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className={labelStyles}>
                  Role Title
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className={inputStyles}
                  placeholder="Frontend Engineer"
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className={labelStyles}>
                  Status
                </label>
                <select
                  className={`${inputStyles} appearance-none bg-[linear-gradient(45deg,transparent_50%,#71717a_50%),linear-gradient(135deg,#71717a_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-20px)_50%,calc(100%-15px)_50%] bg-no-repeat pr-10`}
                  name="status"
                  id="status"
                  required
                >
                  <option value="Wishlist">Wishlist</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <p className={helperTextStyles}>
                  Pick the stage that best reflects where this opportunity sits.
                </p>
              </div>

              <div>
                <label htmlFor="dateApplied" className={labelStyles}>
                  Date Applied
                </label>
                <input
                  type="date"
                  id="dateApplied"
                  name="dateApplied"
                  className={inputStyles}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="url" className={labelStyles}>
                  Job URL
                </label>
                <input
                  type="url"
                  className={inputStyles}
                  name="url"
                  id="url"
                  placeholder="https://company.com/careers/frontend-engineer"
                />
                <p className={helperTextStyles}>
                  Save the posting link for quick reference before interviews or
                  follow-ups.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="nextAction" className={labelStyles}>
                  Next Action
                </label>
                <input
                  type="text"
                  id="nextAction"
                  name="nextAction"
                  className={inputStyles}
                  placeholder="Follow up with recruiter next Friday"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className={labelStyles}>
                  Notes
                </label>
                <textarea
                  className={`${inputStyles} min-h-36 resize-y leading-6`}
                  name="notes"
                  id="notes"
                  placeholder="Paste requirements, recruiter details, compensation notes, or interview prep reminders."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Save application
              </button>
            </div>
          </form>

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
