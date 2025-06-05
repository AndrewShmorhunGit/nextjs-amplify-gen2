import { PageTitle } from "@/components/App/Typography/PageTitle";

export default function OrdersPage() {
  return (
    <div>
      <PageTitle title="Orders" count={25} />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
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
                  Длинное предлинное длиннючее название прихода
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  23
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  Продукта
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  06 / Апр / 2017
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  10 / 12
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  250 000. 50 uan
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  2 500 $
                </div>
              </div>
              <button className="text-[var(--color-text-light)] hover:text-[var(--color-text-error)]">
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
