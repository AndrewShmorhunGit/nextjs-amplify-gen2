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
            className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
          >
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-yellow-400"></div>
              <div className="mr-4">
                <img
                  src={p.photo || "/placeholder.svg?height=40&width=40"}
                  alt={p.title}
                  className="h-10 w-10 rounded-md border border-[var(--color-border)]"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {p.title}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {p.serialNumber}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm font-medium text-[var(--color-text-main)]">
                {p.isNew ? "новый" : "б/у"}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {new Date(p.guaranteeStart).toLocaleDateString()}
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  по {new Date(p.guaranteeEnd).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[var(--color-text-main)]">
                  {p.priceUAH.toLocaleString()} uah
                </div>
                <div className="text-xs text-[var(--color-text-light)]">
                  {p.priceUSD.toLocaleString()} $
                </div>
              </div>
              <div className="w-40 text-sm text-[var(--color-text-main)]">
                {p.group?.name || "—"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
