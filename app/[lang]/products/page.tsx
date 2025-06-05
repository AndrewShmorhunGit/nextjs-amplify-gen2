import { PageTitle } from "@/components/App/Typography/PageTitle";

export default function ProductsPage() {
  return (
    <div>
      <PageTitle title="Products" count={25} />
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-[var(--color-text-light)]">
              Тип:
            </span>
            <select className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-1 text-sm text-[var(--color-text-main)]">
              <option>Moni I</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-[var(--color-text-light)]">
              Спецификация:
            </span>
            <select className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-1 text-sm text-[var(--color-text-main)]">
              <option>Moni I</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
            >
              <div className="flex items-center">
                <div className="mr-2 h-2 w-2 rounded-full bg-yellow-400"></div>
                <div className="mr-4">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Product"
                    className="h-10 w-10 rounded-md border border-[var(--color-border)]"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--color-text-main)]">
                    Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3
                  </div>
                  <div className="text-xs text-[var(--color-text-light)]">
                    SN-12 3456789
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--color-text-main)]">
                    свободен
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--color-text-main)]">
                    06 / 04 / 2017
                  </div>
                  <div className="text-xs text-[var(--color-text-light)]">
                    по 06 / 08 / 2025
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--color-text-main)]">
                    новый
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
                <div className="w-40 text-sm text-[var(--color-text-main)]">
                  Длинное предлинное длиннючее название группы
                </div>
                <div className="w-40 text-sm text-[var(--color-text-main)]">
                  —
                </div>
                <div className="w-40 text-sm text-[var(--color-text-main)]">
                  Длинное предлинное длиннючее название прихода
                </div>
                <div className="text-center text-sm text-[var(--color-text-main)]">
                  06 / Сен / 2017
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
    </div>
  );
}
