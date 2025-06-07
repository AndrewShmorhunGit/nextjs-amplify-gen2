import { cookiesClient } from "@/utils/amplify-utils";
import { PageTitle } from "@/components/App/Typography/PageTitle";

export default async function ProductsPage() {
  const { data: products } = await cookiesClient.models.Product.list();

  return (
    <div>
      <PageTitle title="Products" count={products.length} />
      <div className="mt-6 space-y-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.photo || "/placeholder.svg?height=40&width=40"}
                alt={p.title}
                className="h-14 w-14 rounded-md border border-[var(--color-border)] object-cover"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-[var(--color-text-main)]">
                  {p.title}
                </span>
                <span className="text-[var(--color-text-light)] text-xs">
                  Serial: {p.serialNumber}
                </span>
                <span className="text-[var(--color-text-light)] text-xs">
                  Type: {p.type}
                </span>
                <span className="text-[var(--color-text-light)] text-xs">
                  Group: {p.group?.name || "—"}
                </span>
              </div>
              <div className="ml-auto text-right text-sm">
                <div
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.isNew
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {p.isNew ? "New" : "Used"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mt-2">
              <div>
                <div className="text-[var(--color-text-main)] font-medium">
                  Warranty
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  From: {new Date(p.guaranteeStart).toLocaleDateString()}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  To: {new Date(p.guaranteeEnd).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-main)] font-medium">
                  Price
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {p.priceUAH.toLocaleString()} UAH
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {p.priceUSD.toLocaleString()} USD
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  Default currency: {p.defaultCurrency}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-main)] font-medium">
                  Specification
                </div>
                <div className="text-xs text-[var(--color-text-light)] whitespace-pre-wrap">
                  {p.specification || "—"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
