import { UserLoad } from "@/app/actions/settings/user-load";
import SettingsWrapper from "./settings-render";
import { SubUsersTable } from "./users-table";

export default async function SettingsPage() {
  const users = await UserLoad();

  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-start bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 px-6 py-10">
      <div className="w-full max-w-5xl flex flex-col flex-1 gap-12">
        {/* Settings Section */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm backdrop-blur-sm p-8 transition-colors">
          <SettingsWrapper user={users} />
        </section>

        {/* Sub Users Table Section */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm backdrop-blur-sm p-8 transition-colors">
          <h2 className="text-xl font-semibold tracking-tight mb-6 text-slate-900 dark:text-slate-100">
            Sub Users
          </h2>
          <SubUsersTable />
        </section>
      </div>
    </main>
  );
}
