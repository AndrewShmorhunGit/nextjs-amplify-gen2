"use client";

import { useTransition, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Button } from "./Button";
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
          const { data: existingUsers } = await client.models.User.list({
            filter: {
              email: { eq: user.email },
            },
          });

          let userId: string;

          if (existingUsers.length > 0) {
            userId = existingUsers[0].id;
          } else {
            const { data: createdUser } = await client.models.User.create(user);
            if (!createdUser) throw new Error("User creation failed");
            userId = createdUser.id;
          }

          userMap.set(user.email, userId);
        }

        // === 2. GROUPS ===
        const groupMap = new Map<string, string>();
        for (const group of groups) {
          const { data: existingGroups } = await client.models.Group.list({
            filter: {
              name: { eq: group.name },
            },
          });

          let groupId: string;

          if (existingGroups.length > 0) {
            groupId = existingGroups[0].id;
          } else {
            const { data: createdGroup } =
              await client.models.Group.create(group);
            if (!createdGroup) throw new Error("Group creation failed");
            groupId = createdGroup.id;
          }

          groupMap.set(group.name, groupId);
        }

        // === 3. ORDERS ===
        const orderList = [];
        for (const order of orders) {
          const userId = userMap.get(order.userEmail);
          if (!userId) continue;

          const { data: existingOrders } = await client.models.Order.list({
            filter: {
              title: { eq: order.title },
              userId: { eq: userId },
            },
          });

          let createdOrder;

          if (existingOrders.length > 0) {
            createdOrder = existingOrders[0];
          } else {
            const result = await client.models.Order.create({
              title: order.title,
              description: order.description,
              userId,
            });
            createdOrder = result.data;
          }

          if (createdOrder) orderList.push(createdOrder);
        }

        // === 4. PRODUCTS ===
        const productList = [];
        for (const product of products) {
          const groupId = groupMap.get(product.groupName);
          if (!groupId) continue;

          const { serialNumber, ...rest } = product;

          const { data: existingProducts } = await client.models.Product.list({
            filter: {
              serialNumber: { eq: serialNumber },
            },
          });

          let createdProduct;

          if (existingProducts.length > 0) {
            createdProduct = existingProducts[0];
          } else {
            const result = await client.models.Product.create({
              ...rest,
              serialNumber,
              groupId,
            });
            createdProduct = result.data;
          }

          if (createdProduct) productList.push(createdProduct);
        }

        // === 5. ORDER_PRODUCTS (добавляем только если связки ещё нет) ===
        for (let i = 0; i < productList.length; i++) {
          const product = productList[i];
          const order = orderList[i % orderList.length];

          const { data: existingLinks } = await client.models.OrderProduct.list(
            {
              filter: {
                productId: { eq: product.id },
                orderId: { eq: order.id },
              },
            }
          );

          if (existingLinks.length === 0) {
            await client.models.OrderProduct.create({
              productId: product.id,
              orderId: order.id,
            });
          }
        }

        setDone(true);
      } catch (err) {
        console.error("❌ Seeding failed:", err);
        alert("Seeding error. See console for details.");
      }
    });
  };

  return (
    <Button variant="primary" onClick={handleSeed} disabled={isPending}>
      {isPending ? "Seeding..." : done ? "✅ Seeded" : "Create Seed"}
    </Button>
  );
};
