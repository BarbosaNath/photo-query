// globals.d.ts
export {};

type Actions = 'get' | 'add' | 'remove' | 'update';
declare global {
  interface Window {
    electronAPI: {
      invoke: <T = unknown>(
        channel:
          | 'get-products'
          | `${Actions}-product`
          | 'get-categories'
          | `${Actions}-category`
          | 'get-characteristics'
          | `${Actions}-characteristic`
          | 'get-subcharacteristics'
          | `${Actions}-subcharacteristic`
          | `${Actions}-product-characteristic`
          | `${Actions}-product-image`,
        data?:
          | GetProductsData
          | AddProductData
          | AddCategoryData
          | ActByIdData
          | UpdateCategoryNameData
          | GetSubcharacteristicsData
          | AddSubcharacteristicsData
          | UpdateSubcharacteristicsData
          | RemoveProductCharacteristicData
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

interface AddSubcharacteristicsData {
  newName: string;
  characteristicId: number;
}

interface UpdateSubcharacteristicsData {
  id: number;
  newName: string;
  characteristicId: number;
}

interface RemoveProductCharacteristicData {
  productId: number;
  characteristicId: number;
  subcharacteristicId?: number;
}
