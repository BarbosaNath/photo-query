// globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      invoke: <T = unknown>(
        channel:
          | "get-products"
          | "add-product"
          | "get-categories"
          | "add-category"
          | "remove-category"
          | "update-category",
        data?:
          | GetProductsData
          | AddProductData
          | AddCategoryData
          | ActByIdData
          | UpdateCategoryNameData
          | never,
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

interface AddCategoryData {
  name: string;
}

interface ActByIdData {
  id: number;
}

interface UpdateCategoryNameData {
  id: number;
  newName: string;
}
