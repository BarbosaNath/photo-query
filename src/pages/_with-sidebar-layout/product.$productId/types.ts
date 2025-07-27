import { Product } from '@utils/dtos';

export interface ProductPageProps extends ProductNotFoundProps {
  product?: Product;
}

export interface ProductNotFoundProps {
  onSelectProduct: () => void;
}
