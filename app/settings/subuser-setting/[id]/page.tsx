import { createClient } from "@/lib/supabase/server";

interface SubUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function SubUserPage({ params }: SubUserPageProps) {
  // unwrap the promise
  const { id } = await params;

  const supabase = await createClient();
  const { data: subUser, error } = await supabase
    .from("sub_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching sub user:", error.message);
    return <div className="p-6 text-red-600">Failed to load sub user.</div>;
  }

  if (!subUser) {
    return <div className="p-6 text-gray-500">No sub user found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
        {subUser.fullName}
      </h1>

      <div className="text-slate-600 dark:text-slate-300">
        <p><strong>Email:</strong> {subUser.email}</p>
        <p><strong>Privilege:</strong> {subUser.privilege}</p>
        <p><strong>ID:</strong> {subUser.id}</p>
      </div>

      <div className="pt-4">
        <a
          href="/settings"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Sub Users
        </a>
      </div>
    </div>
  );
}
