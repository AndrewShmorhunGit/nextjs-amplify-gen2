"use client";

import { useState, useMemo, useEffect } from "react";
import { PageTitle } from "@/components/App/Typography/PageTitle";
import { ProductItem } from "./Product/ProductItem";
import type { SelectionSet } from "@aws-amplify/data-schema-types";
import type { Schema } from "@/amplify/data/resource";

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
    "orders.order.user.name",
  ]
>;

interface ProductsClientProps {
  products: ProductSelection[];
}

export function ProductsClient({ products }: ProductsClientProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSpecification, setSelectedSpecification] =
    useState<string>("all");

  // Get unique types and specifications for filter options
  const filterOptions = useMemo(() => {
    const types = new Set<string>();
    const specifications = new Set<string>();

    // Get all unique types
    products.forEach((product) => {
      if (product.type) {
        types.add(product.type);
      }
    });

    // Get specifications based on selected type
    const productsToCheck =
      selectedType === "all"
        ? products
        : products.filter((product) => product.type === selectedType);

    productsToCheck.forEach((product) => {
      if (product.specification) {
        specifications.add(product.specification);
      }
    });

    return {
      types: Array.from(types).sort(),
      specifications: Array.from(specifications).sort(),
    };
  }, [products, selectedType]);

  // Reset specification when type changes and current specification is not available
  useEffect(() => {
    if (selectedType !== "all" && selectedSpecification !== "all") {
      const availableSpecs = filterOptions.specifications;
      if (!availableSpecs.includes(selectedSpecification)) {
        setSelectedSpecification("all");
      }
    }
  }, [selectedType, selectedSpecification, filterOptions.specifications]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatch = selectedType === "all" || product.type === selectedType;
      const specMatch =
        selectedSpecification === "all" ||
        product.specification === selectedSpecification;
      return typeMatch && specMatch;
    });
  }, [products, selectedType, selectedSpecification]);

  return (
    <div>
      {/* Header with title and filters */}
      <div className="flex items-center justify-between">
        <PageTitle title="Products" count={filteredProducts.length} />

        <div className="flex items-center gap-4">
          {/* Type filter */}
          <div className="flex items-center gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-main)" }}
            >
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-9 px-3 rounded-md border text-sm min-w-[120px]"
              style={{
                backgroundColor: "var(--color-bg-input)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <option value="all">All</option>
              {filterOptions.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Specification filter */}
          <div className="flex items-center gap-2">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--color-text-main)" }}
            >
              Specification
            </label>
            <select
              value={selectedSpecification}
              onChange={(e) => setSelectedSpecification(e.target.value)}
              className="h-9 px-3 rounded-md border text-sm min-w-[160px]"
              style={{
                backgroundColor: "var(--color-bg-input)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)",
              }}
            >
              <option value="all">All</option>
              {filterOptions.specifications.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="mt-6 space-y-2">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* No results message */}
      {filteredProducts.length === 0 && (
        <div
          className="mt-8 text-center py-8"
          style={{ color: "var(--color-text-light)" }}
        >
          No products found with the selected filters
        </div>
      )}
    </div>
  );
}
