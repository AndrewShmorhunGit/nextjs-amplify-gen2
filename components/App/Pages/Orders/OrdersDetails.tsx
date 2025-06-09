"use client";

import { X, Plus } from "lucide-react";
import { ProductItem } from "../Products/Product/ProductItem";

type BaseProduct = {
  readonly id: string;
  readonly title: string;
  readonly serialNumber: string;
  readonly type: string;
  readonly isNew: boolean;
  readonly photo: string | null | undefined;
  readonly specification: string | null | undefined;
  readonly guaranteeStart: string;
  readonly guaranteeEnd: string;
  readonly priceUSD: number;
  readonly priceUAH: number;
  readonly defaultCurrency: string;
};

type OrderDetailsProps = {
  order: {
    id: string;
    title: string;
    description?: string | null;
  };
  products: BaseProduct[];
  onClose: () => void;
  onProductDeleted: (productId: string) => void;
};

export function OrderDetails({
  order,
  products,
  onClose,
  onProductDeleted,
}: OrderDetailsProps) {
  return (
    <div
      className="w-1/2 border-l flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-main)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Header */}
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--color-text-main)" }}
          >
            {order.title}
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: "var(--color-text-light)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text-main)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-light)";
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Add Product button under title */}
        <button className="flex items-center gap-2 text-sm transition-colors">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Plus size={12} className="text-white" />
          </div>
          <span style={{ color: "var(--color-text-main)" }}>Add Product</span>
        </button>
      </div>

      {/* Products list */}
      <div className="flex-1 overflow-y-auto">
        {products.length > 0 ? (
          <div
            className="divide-y"
            style={{ borderColor: "var(--color-border)" }}
          >
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                compact
                showActions={true}
                onDeleted={onProductDeleted}
              />
            ))}
          </div>
        ) : (
          <div
            className="p-8 text-center"
            style={{ color: "var(--color-text-light)" }}
          >
            No products in this order
          </div>
        )}
      </div>
    </div>
  );
}
