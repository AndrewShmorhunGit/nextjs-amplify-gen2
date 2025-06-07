"use client";

import { useTransition, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { groups, products } from "@/seed/data";
import type { Schema } from "@/amplify/data/resource";
import { Button } from "./PrimaryButton";

const client = generateClient<Schema>();

export const CreateSeedButton = () => {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    setDone(false);

    startTransition(async () => {
      try {
        const groupNameToId = new Map<string, string>();

        // 1. Группы
        for (const group of groups) {
          const { data: createdGroup } =
            await client.models.Group.create(group);

          if (!createdGroup) {
            throw new Error("Group creation failed: null data");
          }

          groupNameToId.set(group.name, createdGroup.id);
        }

        // 2. Продукты
        for (const product of products) {
          const groupId = groupNameToId.get(product.groupName);
          if (!groupId) continue;

          const { groupName, ...rest } = product;

          await client.models.Product.create({
            ...rest,
            groupId,
          });
        }

        setDone(true);
      } catch (err) {
        console.error("Seeding failed:", err);
        alert("❌ Seeding error, check console.");
      }
    });
  };

  return (
    <Button
      onClick={handleSeed}
      disabled={isPending}
      // className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
    >
      {isPending ? "Seeding..." : done ? "✅ Seeded" : "Create Seed"}
    </Button>
  );
};
