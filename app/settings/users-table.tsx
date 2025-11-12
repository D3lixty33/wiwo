import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function SubUsersTable() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("sub_users").select("*");
  const subUsers = data ?? [];
  const sUserid = subUsers.map((sUsers) => sUsers.id);

  console.log(sUserid);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 transition-colors">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
              Privilege
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Actions
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Go to
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {subUsers.map((sUsers) => (
            <tr
              key={sUsers.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-xs">
                  {sUsers.fullName}
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-xs">
                  {sUsers.email}
                </div>
              </td>

              <td className="px-6 py-4 hidden md:table-cell">
                <div className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-xs">
                  {sUsers.privilege}
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <button className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors">
                    Edit
                  </button>
                  <button className="text-sm px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors">
                    Delete
                  </button>
                </div>
              </td>

              <td className="px-6 py-4 text-right">
                {/* Future “Go to” action (button or link) */}
                <Button asChild>
                  <Link
                    href={`/settings/subuser-setting/${sUsers.id}`}
                    className="inline-block w-full text-center"
                  >
                    Go to specs
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
