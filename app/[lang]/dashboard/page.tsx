"use client";
import { useAppSelector } from "@/app/redux/store.hooks";
import { CreateSeedButton } from "@/components/Buttons/CreateSeedButton";
import { ShieldLogo } from "@/components/Logos/ShieldLogo";

export default function HomePage() {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

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
        <p className="text-lg text-[var(--color-text-light)] mb-12">
          {`Welcome ${user?.preferredUsername}!`}
        </p>
        <CreateSeedButton />
      </div>
    </div>
  );
}
