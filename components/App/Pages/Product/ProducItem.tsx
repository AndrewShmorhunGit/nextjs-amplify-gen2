"use client";

import { Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";

import type { SelectionSet } from "@aws-amplify/data-schema-types";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from "next/navigation";
import { useDialog } from "@/providers/dialog.provider";
import { deleteProductById } from "@/app/[lang]/products/delete.product";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";

type ProductSelection = SelectionSet<
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

export function ProductItem({ product }: { product: ProductSelection }) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [isPending, startTransition] = useTransition();

  const reservedBy = product.orders?.[0]?.order?.user?.name ?? null;
  const orderTitle = product.orders?.[0]?.order?.title ?? null;
  const isReserved = Boolean(reservedBy);
  const statusColor = isReserved ? "bg-yellow-400" : "bg-green-500";

  const handleDelete = () => {
    openDialog({
      component: DeleteDialog,
      props: {
        title: "Delete this product?",
        name: product.title,
        specification: product.specification,
        photo: product.photo,
        statusColor: isReserved ? "bg-yellow-400" : "bg-green-500",
        onConfirm: async () => {
          startTransition(async () => {
            await deleteProductById(product.id);
            router.refresh();
            closeDialog();
          });
        },
      },
    });
  };

  return (
    <div className="group flex items-center gap-4 rounded-md border border-border bg-card px-4 py-3 text-sm shadow-sm">
      <div className="flex-shrink-0">
        <div className={`h-3 w-3 rounded-full ${statusColor}`} />
      </div>

      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
          {product.photo ? (
            <Image
              src={product.photo}
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

      <div className="min-w-[160px]">
        <div className="font-semibold text-foreground">{product.title}</div>
        <div className="text-muted-foreground text-xs">
          {product.specification || "—"}
        </div>
      </div>

      <div className="min-w-[120px] text-muted-foreground text-xs">
        {isReserved ? "Reserved" : "Free"}
      </div>

      <div className="min-w-[140px] text-xs text-muted-foreground">
        <div>From: {new Date(product.guaranteeStart).toLocaleDateString()}</div>
        <div>To: {new Date(product.guaranteeEnd).toLocaleDateString()}</div>
      </div>

      <div className="min-w-[60px]">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
            product.isNew
              ? "bg-green-100 text-green-700 dark:bg-green-300/20 dark:text-green-300"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {product.isNew ? "New" : "Used"}
        </span>
      </div>

      <div className="min-w-[100px] text-xs text-muted-foreground">
        <div>{product.priceUSD} USD</div>
        <div>{product.priceUAH} UAH</div>
      </div>

      <div className="min-w-[100px] text-xs text-muted-foreground">
        {product.group?.name || "—"}
      </div>

      <div className="min-w-[100px] text-xs text-muted-foreground">
        {reservedBy || "—"}
      </div>

      <div className="min-w-[120px] text-xs text-muted-foreground">
        {orderTitle || "—"}
      </div>

      <div className="min-w-[100px] text-xs text-muted-foreground">
        {new Date().toLocaleDateString()}
      </div>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="ml-auto text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
