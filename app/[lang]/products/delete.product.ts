"use server";

import { cookiesClient } from "@/utils/amplify-utils";

export async function deleteProductById(id: string) {
  await cookiesClient.models.Product.delete({ id });
}
