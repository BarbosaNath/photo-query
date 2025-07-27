import { Category, Characteristic, Product } from '@utils/dtos';

export interface CharacteristicFilter {
  id: number;
  subId?: number;
}

export interface HomeProps {
  products: Product[];
  categories: Category[];
  characteristics: Characteristic[];
  searchValue: string;
  selectedCategory: number | null;
  selectedCharacteristics: CharacteristicFilter[] | null;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectCategory: (categoryId: number) => void;
  onSelectCharacteristic: (id: number, subId?: number) => void;
}

export interface FilterProps {
  categories: Category[];
  characteristics: Characteristic[];
  selectedCategory: number | null;
  selectedCharacteristics: CharacteristicFilter[] | null;
  handleSelectCategory: (categoryId: number) => void;
  handleSelectCharacteristic: (id: number, subId?: number) => void;
}
