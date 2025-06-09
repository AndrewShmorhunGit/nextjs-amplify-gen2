"use client";

import type React from "react";

import { useTransition } from "react";
import { ChevronRight, Menu, Trash2 } from "lucide-react";
import type { Schema } from "@/amplify/data/resource";
import type { SelectionSet } from "@aws-amplify/data-schema-types";
import { deleteOrderById } from "@/app/[lang]/orders/actions";
import { useRouter } from "next/navigation";
import { useDialog } from "@/providers/dialog.provider";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";

type OrderSelection = SelectionSet<
  Schema["Order"]["type"],
  ["id", "title", "description", "userId", "createdAt", "updatedAt"]
>;

export function OrderItem({
  order,
  isSelected = false,
  isCompact = false,
  onSelect,
  summary,
}: {
  order: OrderSelection;
  isSelected?: boolean;
  isCompact?: boolean;
  onSelect?: (order: OrderSelection) => void;
  summary: { count: number; totalUSD: number; totalUAH: number };
}) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(order);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    openDialog({
      component: DeleteDialog,
      props: {
        title: "Delete this order?",
        name: order.title,
        specification: order.description,
        photo: null,
        statusColor: "bg-red-500",
        onConfirm: async () => {
          startTransition(async () => {
            await deleteOrderById(order.id);
            router.refresh();
            closeDialog();
          });
        },
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isCompact) {
    return (
      <div className="relative">
        <div
          className="flex items-center rounded-lg transition-all duration-200"
          style={{
            backgroundColor: isSelected
              ? "var(--color-bg-input)"
              : "var(--color-bg-form)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--color-border)",
          }}
        >
          {/* Menu icon in circle */}
          <div className="px-4 py-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--color-primary)",
              }}
              onClick={handleSelect}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
              }}
            >
              <Menu className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Products count */}
          <div className="px-4 py-3">
            <div
              className="text-lg font-semibold"
              style={{ color: "var(--color-text-main)" }}
            >
              {summary.count}
            </div>
            <div
              className="text-xs"
              style={{ color: "var(--color-text-light)" }}
            >
              Products
            </div>
          </div>

          {/* Date - positioned after products count with margin */}
          <div
            className="px-4 py-3 text-xs"
            style={{ color: "var(--color-text-light)" }}
          >
            {formatDate(order.createdAt)}
          </div>

          {/* Spacer to push arrow to the right */}
          <div className="flex-1" />
        </div>

        {/* Arrow indicator as separate element - full height and thicker */}
        {isSelected && (
          <div
            className="absolute top-0 right-0 h-full w-12 flex items-center justify-center rounded-r-lg"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          >
            <ChevronRight className="h-6 w-6 text-white" strokeWidth={3} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="rounded-lg transition-colors shadow-sm"
      style={{
        backgroundColor: "var(--color-bg-form)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="flex items-center px-6 py-4">
        {/* Order title - takes up available space */}
        <div className="flex-1 min-w-0 pr-6">
          <div
            className="font-medium truncate"
            style={{ color: "var(--color-text-main)" }}
          >
            {order.title}
          </div>
        </div>

        {/* Menu icon in circle */}
        <div className="px-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
            onClick={handleSelect}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-primary-dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";
            }}
          >
            <Menu className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Products count */}
        <div className="px-4 text-center min-w-[80px]">
          <div
            className="text-lg font-semibold"
            style={{ color: "var(--color-text-main)" }}
          >
            {summary.count}
          </div>
          <div className="text-xs" style={{ color: "var(--color-text-light)" }}>
            Products
          </div>
        </div>

        {/* Date */}
        <div
          className="px-4 text-xs min-w-[100px] text-center"
          style={{ color: "var(--color-text-light)" }}
        >
          {formatDate(order.createdAt)}
        </div>

        {/* Total sum */}
        <div className="px-4 text-right min-w-[140px]">
          {summary.totalUSD > 0 || summary.totalUAH > 0 ? (
            <>
              <div
                className="text-sm font-medium"
                style={{ color: "var(--color-text-main)" }}
              >
                {summary.totalUSD.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}{" "}
                $
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-light)" }}
              >
                {summary.totalUAH.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}{" "}
                uah
              </div>
            </>
          ) : (
            <div
              className="text-xs"
              style={{ color: "var(--color-text-light)" }}
            >
              {summary.count === 0 ? "No products" : "Loading..."}
            </div>
          )}
        </div>

        {/* Delete button */}
        <div className="px-4">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="transition-colors cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
