import { ShieldLogo } from "@/components/Logos/SheildLogo";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center bg-[var(--color-bg-main)]">
      <div className="text-center mt-24">
        <div className="mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <ShieldLogo />
          </div>
          <h1 className="mt-4 text-3xl font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Inventory
          </h1>
        </div>
        <p className="text-lg text-[var(--color-text-light)]">
          Welocme `UserName`!
        </p>
      </div>
    </div>
  );
}
