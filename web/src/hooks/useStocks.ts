import { ProductFormData } from "@/modules/products/validation/product";
import { useMemo, useEffect, useState, useCallback } from "react";

interface UseStocksProps {
  initialData?: ProductFormData;
  attributes: [string[], string[], string[]]; // [ageGroups, sizes, colors]
}

// Updated StockItem to have named fields
interface StockItem {
  _id?: string; // Optional ID for existing items
  ageGroup?: string;
  size?: string;
  color?: string;
  stock: number;
}

// Modified to create objects with named fields
export const generateCombinations = (
  attrArrays: string[][],
  index: number = 0,
  current: { ageGroup?: string; size?: string; color?: string } = {}
): Array<{ ageGroup?: string; size?: string; color?: string }> => {
  // Return empty array if all attribute arrays are empty
  if (attrArrays.every((arr) => arr.length === 0)) {
    return [
      {
        // Default stock for empty combinations
      },
    ];
  }

  // Return current object if we've processed all attribute arrays
  if (index === attrArrays.length) {
    return [current];
  }

  // Skip empty arrays
  if (attrArrays[index].length === 0) {
    return generateCombinations(attrArrays, index + 1, current);
  }

  const combinations: Array<{
    ageGroup?: string;
    size?: string;
    color?: string;
  }> = [];

  for (const value of attrArrays[index]) {
    // Create a new combination based on the current index (field type)
    const newCombination = { ...current };

    // Assign the value to the appropriate field based on index
    if (index === 0) newCombination.ageGroup = value;
    else if (index === 1) newCombination.size = value;
    else if (index === 2) newCombination.color = value;

    // Recursively generate combinations for the next index
    const nextCombinations = generateCombinations(
      attrArrays,
      index + 1,
      newCombination
    );

    combinations.push(...nextCombinations);
  }

  return combinations;
};

/**
 * Hook to generate all possible combinations of attributes with stock
 * @param attributes An array of arrays: [ageGroups, sizes, colors]
 * @returns An object with stocks array and setStockCount function
 */
export const useStocks = ({ initialData, attributes }: UseStocksProps) => {
  const [stocks, setStocks] = useState<Record<string, StockItem>>({});

  // Generate combinations whenever attributes change
  const combinations = useMemo(() => {
    // Filter out empty attribute arrays
    const filteredAttributes = [...attributes]; // Create a copy to avoid mutating the original

    // Generate combinations with named fields
    return generateCombinations(filteredAttributes);
  }, [attributes]);

  // Update the stocks state whenever combinations change
  useEffect(() => {
    if (combinations.length === 0) return;

    // Create new stocks object preserving existing counts
    const newStocks: Record<string, StockItem> = {};

    // Add all new combinations
    combinations.forEach((combo) => {
      // Create a key from the combination fields
      const key = JSON.stringify({
        ageGroup: combo.ageGroup,
        size: combo.size,
        color: combo.color,
      });

      // If this combination already exists, keep its count, otherwise initialize to 0
      newStocks[key] = {
        ...combo,
        stock: stocks[key]?.stock || 0,
      };
    });

    // Only update state if something changed
    if (
      JSON.stringify(Object.keys(newStocks).sort()) !==
      JSON.stringify(Object.keys(stocks).sort())
    ) {
      setStocks(newStocks);
    }
  }, [combinations, stocks]);

  // Function to update stock count by combination fields
  const setStockCount = useCallback(
    (
      combo: { ageGroup?: string; size?: string; color?: string },
      stock: number
    ) => {
      const key = JSON.stringify({
        ageGroup: combo.ageGroup,
        size: combo.size,
        color: combo.color,
      });

      setStocks((prevStocks) => {
        // Check if this combination exists
        if (!prevStocks[key]) {
          console.warn(`Stock combination not found: ${JSON.stringify(combo)}`);
          return prevStocks;
        }

        // Return updated stocks
        return {
          ...prevStocks,
          [key]: {
            ...prevStocks[key],
            stock,
          },
        };
      });
    },
    []
  );

  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    if (combinations.length !== 0 && isInitialRender) {
      setIsInitialRender(false);
      initialData?.variants?.forEach((variant) =>
        setStockCount(variant, variant.stock)
      );
      console.log("Initial stock counts set from initialData");
    }
  }, [combinations.length, isInitialRender, initialData, setStockCount]);

  // Calculate total count from all stock items
  const totalCount = useMemo(
    () => Object.values(stocks).reduce((sum, item) => sum + item.stock, 0),
    [stocks]
  );

  // Return both the stocks array, the setter function, and total count
  return {
    stocks: useMemo(() => Object.values(stocks), [stocks]),
    setStockCount,
    totalCount,
  };
};
