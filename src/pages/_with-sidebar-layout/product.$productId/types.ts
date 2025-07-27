import { Product } from '@utils/dtos';

export interface ProductPageProps {
  product?: Product;
  onSelectProduct: () => void;
}
