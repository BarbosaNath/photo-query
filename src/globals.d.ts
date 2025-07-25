// globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      invoke: <T = unknown>(
        channel:
          | 'get-products'
          | 'add-product'
          | 'get-categories'
          | 'add-category'
          | 'remove-category'
          | 'update-category'
          | 'add-characteristic'
          | 'get-characteristic'
          | 'get-characteristics'
          | 'update-characteristic'
          | 'remove-characteristic'
          | 'get-subcharacteristics',
        data?:
          | GetProductsData
          | AddProductData
          | AddCategoryData
          | ActByIdData
          | UpdateCategoryNameData
          | GetSubcharacteristicsData
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

interface GetSubcharacteristicsData {
  characteristicId: number;
}
