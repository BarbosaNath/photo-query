// globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      invoke: <T = unknown>(
        channel: "get-products" | "get-categories" | "add-product",
        data?: GetProductsData | AddProductData | never,
      ) => Promise<T>;
    };
  }
}

interface GetProductsData {
  categoryId?: number;
  characteristics?: { id?: number; subId?: number }[];
}

interface AddProductData {
  name: string;
  categoryId: number;
}
