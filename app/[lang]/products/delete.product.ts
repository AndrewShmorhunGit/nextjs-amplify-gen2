"use server";

import { cookiesClient } from "@/utils/amplify-utils";

export async function deleteProductById(id: string) {
  // Step 1: Find all OrderProduct entries linked to this product
  const { data: orderLinks } = await cookiesClient.models.OrderProduct.list({
    filter: { productId: { eq: id } },
  });

  // Step 2: Delete all OrderProduct records for this product
  await Promise.all(
    orderLinks.map((link) =>
      cookiesClient.models.OrderProduct.delete({ id: link.id })
    )
  );

  // Step 3: Delete the product itself
  await cookiesClient.models.Product.delete({ id });
}
