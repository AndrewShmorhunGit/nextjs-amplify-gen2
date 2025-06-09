import { cookiesClient } from "@/utils/amplify-utils";
import { ProductsClient } from "./ProductsClient";

export async function Products() {
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

  return <ProductsClient products={products} />;
}
