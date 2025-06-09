"use client";

import type React from "react";

import { Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { SelectionSet } from "@aws-amplify/data-schema-types";
import type { Schema } from "@/amplify/data/resource";
import { useDialog } from "@/providers/dialog.provider";
import { deleteProductById } from "@/app/[lang]/products/delete.product";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";

// Base product type
type BaseProductSelection = SelectionSet<
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

// Full product type
type FullProductSelection = SelectionSet<
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
    "group.name",
    "orders.order.title",
    "orders.order.user.name",
  ]
>;

type ProductSelection = BaseProductSelection | FullProductSelection;

export function ProductItem({
  product,
  compact = false,
  showActions = true,
  onDeleted,
}: {
  product: ProductSelection;
  compact?: boolean;
  showActions?: boolean;
  onDeleted?: (productId: string) => void;
}) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [isPending, startTransition] = useTransition();

  // Safely get data with existence checks
  const reservedBy =
    ("orders" in product && product.orders?.[0]?.order?.user?.name) ?? null;
  const orderTitle =
    ("orders" in product && product.orders?.[0]?.order?.title) ?? null;
  const isReserved = Boolean(reservedBy);
  const statusColor = isReserved ? "#ffc107" : "#28a745";
  const groupName = ("group" in product && product.group?.name) ?? null;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDialog({
      component: DeleteDialog,
      props: {
        title: "Delete this product?",
        name: product.title,
        specification: product.specification,
        photo: product.photo,
        statusColor: "bg-red-500",
        onConfirm: async () => {
          startTransition(async () => {
            await deleteProductById(product.id);
            if (onDeleted) {
              onDeleted(product.id);
            } else {
              router.refresh();
            }
            closeDialog();
          });
        },
      },
    });
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === "UAH") {
      return `${price.toFixed(2)} ₴`;
    }
    return `$${price.toFixed(2)}`;
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-4 py-4 px-6 transition-colors"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-bg-input)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {/* Status indicator */}
        <div
          className="h-2 w-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: statusColor }}
        />

        {/* Product image */}
        <div className="flex-shrink-0">
          <div
            className="flex h-10 w-10 items-center justify-center rounded border"
            style={{
              backgroundColor: "var(--color-bg-input)",
              borderColor: "var(--color-border)",
              color: "var(--color-text-light)",
            }}
          >
            {product.photo ? (
              <Image
                src={product.photo || "/placeholder.svg"}
                alt={product.title}
                width={40}
                height={40}
                className="rounded object-cover"
              />
            ) : (
              <ImageIcon className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Title and specification */}
        <div className="flex-1 min-w-0">
          <div
            className="font-medium text-sm truncate"
            style={{ color: "var(--color-text-main)" }}
          >
            {product.title}
          </div>
          <div
            className="text-xs truncate"
            style={{ color: "var(--color-text-light)" }}
          >
            {product.serialNumber} • {product.specification || "—"}
          </div>
        </div>

        {/* Status */}
        <div className="flex-shrink-0 text-xs min-w-[80px] text-right">
          <span className="font-medium" style={{ color: statusColor }}>
            {isReserved ? "In Repair" : "Free"}
          </span>
        </div>

        {/* Delete button */}
        {showActions && (
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-shrink-0 transition-colors cursor-pointer ml-4"
            style={{ color: "var(--color-text-light)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text-error)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-light)";
            }}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="group flex items-center gap-4 px-4 py-3 text-sm rounded-md border shadow-sm"
      style={{
        backgroundColor: "var(--color-bg-form)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Status indicator */}
      <div className="flex-shrink-0">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Product image */}
      <div className="flex-shrink-0">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-md border"
          style={{
            backgroundColor: "var(--color-bg-input)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-light)",
          }}
        >
          {product.photo ? (
            <Image
              src={product.photo || "/placeholder.svg"}
              alt={product.title}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />
          ) : (
            <ImageIcon className="h-6 w-6" />
          )}
        </div>
      </div>

      {/* Title and specification */}
      <div className="min-w-[160px] flex-1">
        <div
          className="font-semibold"
          style={{ color: "var(--color-text-main)" }}
        >
          {product.title}
        </div>
        <div className="text-xs" style={{ color: "var(--color-text-light)" }}>
          {product.specification || "—"}
        </div>
      </div>
      {/* Status */}
      <div className="min-w-[100px] text-xs">
        <span className="font-medium" style={{ color: statusColor }}>
          {isReserved ? "In Repair" : "Free"}
        </span>
      </div>

      {/* Warranty dates */}
      <div
        className="min-w-[140px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        <div>
          From: {new Date(product.guaranteeStart).toLocaleDateString("en-US")}
        </div>
        <div>
          To: {new Date(product.guaranteeEnd).toLocaleDateString("en-US")}
        </div>
      </div>

      {/* Condition (new/used) */}
      <div
        className="min-w-[60px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        {product.isNew ? "New" : "Used"}
      </div>

      {/* Price */}
      <div
        className="min-w-[120px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        <div>{formatPrice(product.priceUSD, "USD")}</div>
        <div>{formatPrice(product.priceUAH, "UAH")}</div>
      </div>

      {/* Group */}
      <div
        className="min-w-[120px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        {groupName || "—"}
      </div>

      {/* User */}
      <div
        className="min-w-[120px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        {reservedBy || "—"}
      </div>

      {/* Order title */}
      <div
        className="min-w-[140px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        {orderTitle || "—"}
      </div>

      {/* Date */}
      <div
        className="min-w-[100px] text-xs"
        style={{ color: "var(--color-text-light)" }}
      >
        {new Date().toLocaleDateString("en-US")}
      </div>

      {showActions && (
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="ml-auto transition-colors cursor-pointer"
          style={{ color: "var(--color-text-light)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-error)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-light)";
          }}
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
