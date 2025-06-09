"use client";

import { useState, useEffect, useTransition } from "react";
import { PageTitle } from "@/components/App/Typography/PageTitle";
import { OrderItem } from "./Order/OrderItem";

import { getOrderSummary } from "@/app/[lang]/orders/actions";
import { PageLoader } from "@/components/App/Loaders/PageLoader";
import type { Schema } from "@/amplify/data/resource";
import type { SelectionSet } from "@aws-amplify/data-schema-types";
import { OrderDetails } from "./OrdersDetails";

type OrderSelection = SelectionSet<
  Schema["Order"]["type"],
  ["id", "title", "description", "userId", "createdAt", "updatedAt"]
>;

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

export function OrdersPageClient({ orders }: { orders: OrderSelection[] }) {
  const [selectedOrder, setSelectedOrder] = useState<OrderSelection | null>(
    null
  );
  const [selectedProducts, setSelectedProducts] = useState<BaseProduct[]>([]);
  const [orderSummaries, setOrderSummaries] = useState<
    Record<string, { count: number; totalUSD: number; totalUAH: number }>
  >({});
  const [orderProducts, setOrderProducts] = useState<
    Record<string, BaseProduct[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [, startTransition] = useTransition();

  // Load data for all orders on mount
  useEffect(() => {
    setIsLoading(true);
    startTransition(async () => {
      const summariesPromises = orders.map(async (order) => {
        const orderData = await getOrderSummary(order.id);
        return {
          orderId: order.id,
          summary: {
            count: orderData.count,
            totalUSD: orderData.totalUSD,
            totalUAH: orderData.totalUAH,
          },
          products: orderData.products,
        };
      });

      const results = await Promise.all(summariesPromises);

      const summaries: Record<
        string,
        { count: number; totalUSD: number; totalUAH: number }
      > = {};
      const products: Record<string, BaseProduct[]> = {};

      results.forEach(({ orderId, summary, products: orderProductsList }) => {
        summaries[orderId] = summary;
        products[orderId] = orderProductsList;
      });

      setOrderSummaries(summaries);
      setOrderProducts(products);
      setIsLoading(false);
    });
  }, [orders]);

  const handleOrderSelect = (order: OrderSelection) => {
    setSelectedOrder(order);
    setSelectedProducts(orderProducts[order.id] || []);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setSelectedProducts([]);
  };

  const handleProductDeleted = (deletedProductId: string) => {
    // Remove product from selected products
    const updatedProducts = selectedProducts.filter(
      (product) => product.id !== deletedProductId
    );
    setSelectedProducts(updatedProducts);

    // Update order summary and products
    if (selectedOrder) {
      const totalUSD = updatedProducts.reduce(
        (acc, product) => acc + product.priceUSD,
        0
      );
      const totalUAH = updatedProducts.reduce(
        (acc, product) => acc + product.priceUAH,
        0
      );

      setOrderSummaries((prev) => ({
        ...prev,
        [selectedOrder.id]: {
          count: updatedProducts.length,
          totalUSD,
          totalUAH,
        },
      }));

      setOrderProducts((prev) => ({
        ...prev,
        [selectedOrder.id]: updatedProducts,
      }));
    }
  };

  const getOrderSummaryData = (orderId: string) => {
    return orderSummaries[orderId] || { count: 0, totalUSD: 0, totalUAH: 0 };
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      className="flex h-full"
      style={{ backgroundColor: "var(--color-bg-main)" }}
    >
      {/* Orders list */}
      <div
        className={`${selectedOrder ? "w-1/2" : "w-full"} transition-all duration-300`}
      >
        <div className="p-6">
          <PageTitle title="Orders" count={orders.length} />
          <div className="mt-6 space-y-3">
            {orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                isSelected={selectedOrder?.id === order.id}
                isCompact={!!selectedOrder}
                onSelect={handleOrderSelect}
                summary={getOrderSummaryData(order.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Order details */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          products={selectedProducts}
          onClose={handleCloseDetails}
          onProductDeleted={handleProductDeleted}
        />
      )}
    </div>
  );
}
