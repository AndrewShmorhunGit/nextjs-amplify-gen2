"use client";

import { useTransition, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Button } from "./PrimaryButton";
import { users, groups, orders, products } from "@/seed/data";

const client = generateClient<Schema>();

export const CreateSeedButton = () => {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    setDone(false);

    startTransition(async () => {
      try {
        // === 1. USERS ===
        const userMap = new Map<string, string>();
        for (const user of users) {
          const { data: createdUser } = await client.models.User.create(user);
          if (!createdUser) throw new Error("User creation failed");
          userMap.set(user.email, createdUser.id);
        }

        // === 2. GROUPS ===
        const groupMap = new Map<string, string>();
        for (const group of groups) {
          const { data: createdGroup } =
            await client.models.Group.create(group);
          if (!createdGroup) throw new Error("Group creation failed");
          groupMap.set(group.name, createdGroup.id);
        }

        // === 3. ORDERS ===
        const orderList = [];
        for (const order of orders) {
          const userId = userMap.get(order.userEmail);
          if (!userId) continue;
          const { data: createdOrder } = await client.models.Order.create({
            title: order.title,
            description: order.description,
            userId,
          });
          if (createdOrder) orderList.push(createdOrder);
        }

        // === 4. PRODUCTS ===
        const productList = [];
        for (const product of products) {
          const groupId = groupMap.get(product.groupName);
          if (!groupId) continue;

          const { groupName, ...rest } = product;

          const { data: createdProduct } = await client.models.Product.create({
            ...rest,
            groupId,
          });

          if (createdProduct) productList.push(createdProduct);
        }

        // === 5. ORDER_PRODUCTS (раскидываем продукты по заказам по очереди) ===
        for (let i = 0; i < productList.length; i++) {
          const product = productList[i];
          const order = orderList[i % orderList.length];

          await client.models.OrderProduct.create({
            productId: product.id,
            orderId: order.id,
          });
        }

        setDone(true);
      } catch (err) {
        console.error("❌ Seeding failed:", err);
        alert("Seeding error. See console for details.");
      }
    });
  };

  return (
    <Button onClick={handleSeed} disabled={isPending}>
      {isPending ? "Seeding..." : done ? "✅ Seeded" : "Create Seed"}
    </Button>
  );
};
