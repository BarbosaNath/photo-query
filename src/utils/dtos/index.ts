export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Characteristic {
  id: number;
  name: string;
  subcharacteristics?: Subcharacteristic[];
  created_at: string;
  updated_at: string;
}

export interface Subcharacteristic {
  id: number;
  name: string;
  characteristic_id: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  category_id?: number;
  category_name?: string;
  characteristics?: {
    characteristicId: number;
    characteristicName?: string;
    subcharacteristicId?: number;
    subcharacteristicName?: string;
  }[];
  created_at: string;
  updated_at: string;
}
