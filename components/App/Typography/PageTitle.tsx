import { Plus } from "lucide-react";

interface PageTitleProps {
  title: string;
  count?: number;
}

export function PageTitle({ title, count }: PageTitleProps) {
  return (
    <div className="flex items-center">
      <button className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
        <Plus className="h-5 w-5" />
      </button>
      <h1 className="text-xl font-medium text-[var(--color-text-main)]">
        {title} {count !== undefined && `/ ${count}`}
      </h1>
    </div>
  );
}
