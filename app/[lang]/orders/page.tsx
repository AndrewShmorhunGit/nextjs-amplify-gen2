import { cookiesClient } from "@/utils/amplify-utils";
import { PageTitle } from "@/components/App/Typography/PageTitle";

export default async function OrdersPage() {
  const { data: orders } = await cookiesClient.models.Order.list();

  return (
    <div>
      <PageTitle title="Orders" count={orders.length} />
      <div className="mt-6 space-y-4">
        {await Promise.all(
          orders.map(async (order) => {
            const productsRes = await order.products();
            const products = productsRes.data ?? [];

            const created = new Date(order.createdAt);
            const updated = new Date(order.updatedAt);

            return (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg-form)] p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center text-[var(--color-text-light)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--color-text-main)]">
                      {order.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-light)]">
                      {products.length} products
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-[var(--color-text-light)]">
                  <div>{created.toLocaleDateString()}</div>
                  <div>{updated.toLocaleDateString()}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
