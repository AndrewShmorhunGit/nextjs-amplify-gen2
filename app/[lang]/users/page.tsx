import { PageTitle } from "@/components/App/Typography/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { format } from "date-fns";

export default async function UsersPage() {
  const { data: users } = await cookiesClient.models.User.list();

  return (
    <div>
      <PageTitle title="Users" count={users.length} />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.email}
            className="flex flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                  {user.name?.charAt(0) ?? "?"}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {user.name}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-[var(--color-text-light)]">
              Created: {format(new Date(user.createdAt), "yyyy-MM-dd HH:mm")}
            </div>
            <div className="text-xs text-[var(--color-text-light)]">
              Updated: {format(new Date(user.updatedAt), "yyyy-MM-dd HH:mm")}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-[var(--color-text-light)] italic">
                Role: {user.role}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[var(--color-text-light)] hover:text-[var(--color-primary)]">
                  <EditIcon />
                </button>
                <button className="text-[var(--color-text-light)] hover:text-[var(--color-text-error)]">
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
