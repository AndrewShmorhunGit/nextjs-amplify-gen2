import { cookiesClient } from "@/utils/amplify-utils";
import { PageTitle } from "@/components/App/Typography/PageTitle";

export default async function GroupsPage() {
  const { data: groups } = await cookiesClient.models.Group.list({
    // limit: 100,
  });

  return (
    <div>
      <PageTitle title="Groups" count={groups.length} />

      <div className="mt-6 grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
          >
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-text-light)]"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {group.name}
                </div>
                {group.type && (
                  <div className="text-xs text-[var(--color-text-light)]">
                    {group.type}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {/* Пока фейк: продукты не загружены в этом запросе */}
                  {group.products?.length ?? "—"}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  Продукта
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {new Date(group.createdAt).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {new Date(group.updatedAt).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </div>
              </div>

              <button className="text-[var(--color-text-light)] hover:text-[var(--color-primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
