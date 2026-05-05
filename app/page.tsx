import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-400">
            Job Hunt Command Center
          </h1>
          <p className="max-w-lg text-lg leading-8 dark:text-zinc-400text-lg  text-zinc-600 dark:text-zinc-400">
            Manage applications, interviews, contacts, and next steps in one place.
          </p>
          <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-150 ease-in-out"
              href="/dashboard">Dashboard</Link>
        </div>
      </main>
    </div>
  );
}
