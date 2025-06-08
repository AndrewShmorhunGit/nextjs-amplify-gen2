"use client";

import { Trash2, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../Buttons/Button";

type Props = {
  title: string;
  name: string;
  specification?: string | null;
  photo?: string | null;
  statusColor: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function DeleteDialog({
  title,
  name,
  specification,
  photo,
  statusColor,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-md shadow-xl bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-6 py-4 bg-[hsl(var(--card))]">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex items-center gap-4 px-6 py-5">
          <div className={`h-3 w-3 rounded-full ${statusColor}`} />
          <div className="flex h-12 w-12 items-center justify-center rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
            {photo ? (
              <Image
                src={photo}
                alt={name}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
            ) : (
              <ImageIcon className="h-6 w-6" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[hsl(var(--foreground))]">
              {name}
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {specification || "—"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-[hsl(var(--border))] bg-[hsl(var(--primary))] px-6 py-4">
          <Button
            variant="primary"
            onClick={onClose}
            className="text-[hsl(var(--card-foreground))]  hover:bg-white/40 backdrop-blur"
          >
            Cancel
          </Button>
          <Button variant="errorGhost" onClick={onConfirm}>
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
