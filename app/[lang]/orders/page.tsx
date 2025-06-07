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
            // Получим продукты по orderId
            const productsRes = await order.products();
            const products = productsRes.data ?? [];

            // Получим пользователя (если надо)
            const userRes = await order.user();
            const user = userRes.data;

            // Считаем сумму
            const totalUAH = products.reduce((acc, p) => acc + p.priceUAH, 0);
            const totalUSD = products.reduce((acc, p) => acc + p.priceUSD, 0);

            return (
              <div
                key={order.id}
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
                      {order.title}
                    </div>
                    {user && (
                      <div className="text-xs text-[var(--color-text-light)]">
                        {user.name} ({user.role})
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--color-text-main)]">
                      {products.length}
                    </div>
                    <div className="text-xs text-[var(--color-text-light)]">
                      Продукта
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--color-text-main)]">
                      {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-[var(--color-text-light)]">
                      {new Date(order.updatedAt).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-[var(--color-text-main)]">
                      {totalUAH.toLocaleString()} uah
                    </div>
                    <div className="text-xs text-[var(--color-text-light)]">
                      {totalUSD.toLocaleString()} $
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
            );
          })
        )}
      </div>
    </div>
  );
}
