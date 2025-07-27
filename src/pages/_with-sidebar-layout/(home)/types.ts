import { Product } from '@utils/dtos';

export interface HomeProps {
  products: Product[];
  searchValue: string;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
