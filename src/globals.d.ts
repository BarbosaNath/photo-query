// globals.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      invoke: InvokeFilterProduct;
    };
  }
}

type InvokeFilterProduct = (
  channel: "get-products",
  data?: {
    categoryId?: number;
    characteristics?: { id?: number; subId?: number }[];
  },
) => Promise<
  {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }[]
>;
