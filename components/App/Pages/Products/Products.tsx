import { cookiesClient } from "@/utils/amplify-utils";
import { PageTitle } from "@/components/App/Typography/PageTitle";
import { ProductItem } from "./Product/ProductItem";

export async function Products() {
  // const selectionSet: ModelPath<Schema["Product"]["type"]>[] = [
  const selectionSet = [
    "id",
    "title",
    "serialNumber",
    "type",
    "isNew",
    "photo",
    "specification",
    "guaranteeStart",
    "guaranteeEnd",
    "priceUSD",
    "priceUAH",
    "defaultCurrency",
    "group.name",
    "orders.order.user.name",
  ] as const;

  const { data: products } = await cookiesClient.models.Product.list({
    selectionSet,
  });

  return (
    <div>
      <PageTitle title="Products" count={products.length} />
      <div className="mt-6 space-y-2">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
