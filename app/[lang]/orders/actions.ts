"use server";

import { cookiesClient } from "@/utils/amplify-utils";
import type { SelectionSet } from "@aws-amplify/data-schema-types";
import type { Schema } from "@/amplify/data/resource";

type BaseProduct = SelectionSet<
  Schema["Product"]["type"],
  [
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
  ]
>;

export type OrderSummary = {
  count: number;
  totalUSD: number;
  totalUAH: number;
  products: BaseProduct[];
};

export async function getOrderSummary(orderId: string): Promise<OrderSummary> {
  try {
    const { data: orderProducts } =
      await cookiesClient.models.OrderProduct.list({
        filter: { orderId: { eq: orderId } },
        selectionSet: [
          "id",
          "productId",
          "product.id",
          "product.title",
          "product.serialNumber",
          "product.type",
          "product.isNew",
          "product.photo",
          "product.specification",
          "product.guaranteeStart",
          "product.guaranteeEnd",
          "product.priceUSD",
          "product.priceUAH",
          "product.defaultCurrency",
        ],
      });

    const products = orderProducts
      .map((op) => op.product)
      .filter(Boolean) as BaseProduct[];
    const totalUSD = products.reduce(
      (acc, product) => acc + product.priceUSD,
      0
    );
    const totalUAH = products.reduce(
      (acc, product) => acc + product.priceUAH,
      0
    );

    return {
      count: products.length,
      totalUSD,
      totalUAH,
      products,
    };
  } catch (error) {
    console.error("Error loading order summary:", error);
    return {
      count: 0,
      totalUSD: 0,
      totalUAH: 0,
      products: [],
    };
  }
}

export async function getOrderProductsCount(orderId: string): Promise<number> {
  try {
    const { data: orderProducts } =
      await cookiesClient.models.OrderProduct.list({
        filter: { orderId: { eq: orderId } },
        selectionSet: ["id"],
      });
    return orderProducts.length;
  } catch (error) {
    console.error("Error loading products count:", error);
    return 0;
  }
}

export async function getOrderProducts(
  orderId: string
): Promise<BaseProduct[]> {
  try {
    const { data: orderProducts } =
      await cookiesClient.models.OrderProduct.list({
        filter: { orderId: { eq: orderId } },
        selectionSet: [
          "id",
          "productId",
          "product.id",
          "product.title",
          "product.serialNumber",
          "product.type",
          "product.isNew",
          "product.photo",
          "product.specification",
          "product.guaranteeStart",
          "product.guaranteeEnd",
          "product.priceUSD",
          "product.priceUAH",
          "product.defaultCurrency",
        ],
      });

    return orderProducts
      .map((op) => op.product)
      .filter(Boolean) as BaseProduct[];
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export async function deleteOrderById(orderId: string): Promise<void> {
  try {
    // Step 1: Find all OrderProduct entries linked to this order
    const { data: orderProducts } =
      await cookiesClient.models.OrderProduct.list({
        filter: { orderId: { eq: orderId } },
        selectionSet: ["id"],
      });

    // Step 2: Delete all OrderProduct records for this order (but keep the products)
    await Promise.all(
      orderProducts.map((orderProduct) =>
        cookiesClient.models.OrderProduct.delete({ id: orderProduct.id })
      )
    );

    // Step 3: Delete the order itself
    await cookiesClient.models.Order.delete({ id: orderId });
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
