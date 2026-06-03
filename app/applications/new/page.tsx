import Link from "next/link";

const statusOptions = ["Wishlist", "Applied", "Interview", "Offer", "Rejected"];

export default async function AddApplication() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Applications
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
              Add Application
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
              Capture the key details for a new opportunity so every follow-up,
              note, and job link stays organized in one place.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-blue-100/60">
          <div className="border-b border-zinc-200 bg-zinc-950 px-6 py-5 sm:px-8">
            <h2 className="text-xl font-semibold text-white">Opportunity details</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Required fields are marked with an asterisk.
            </p>
          </div>

          <form className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div className="sm:col-span-1">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-zinc-800"
              >
                Company Name <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Acme Corp"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-zinc-800"
              >
                Role Title <span className="text-blue-600">*</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Product Designer"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-zinc-800"
              >
                Status <span className="text-blue-600">*</span>
              </label>
              <select
                name="status"
                id="status"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="url"
                className="block text-sm font-semibold text-zinc-800"
              >
                Job URL
              </label>
              <input
                type="url"
                name="url"
                id="url"
                placeholder="https://company.com/jobs/role"
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-zinc-800"
              >
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                rows={6}
                placeholder="Add recruiter names, interview details, salary notes, or follow-up reminders."
                className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-end">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Save Application
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
