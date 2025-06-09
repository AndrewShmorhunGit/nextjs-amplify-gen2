import { OrdersPageClient } from "@/components/App/Pages/Orders/OrdersPageClient";
import { cookiesClient } from "@/utils/amplify-utils";

export default async function OrdersPage() {
  const { data: orders } = await cookiesClient.models.Order.list({
    selectionSet: [
      "id",
      "title",
      "description",
      "userId",
      "createdAt",
      "updatedAt",
    ],
  });

  return <OrdersPageClient orders={orders} />;
}
