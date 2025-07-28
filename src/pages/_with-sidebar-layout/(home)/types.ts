import { Category, Characteristic, Product } from '@utils/dtos';

export interface CharacteristicFilter {
  id: number;
  subId?: number;
}

export type HomeProps = SearchBarProps & FilterProps & ProductListProps;

export interface SearchBarProps {
  searchValue: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShare: () => void;
}

export interface FilterProps {
  categories: Category[];
  characteristics: Characteristic[];
  selectedCategory: number | null;
  selectedCharacteristics: CharacteristicFilter[] | null;
  onSelectCategory: (categoryId: number) => void;
  onSelectCharacteristic: (id: number, subId?: number) => void;
}

export interface ProductListProps {
  products: Product[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}
