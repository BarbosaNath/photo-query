import { Product } from '@utils/dtos';

export interface ProductPageProps extends ProductNotFoundProps {
  product?: Product;
  whichModalIsOpen:
    | 'add-image'
    | 'change-category'
    | 'add-characteristic'
    | null;
  onChangeCategory: () => void;
  onRemoveCharacteristic: (
    characteristicId: number,
    subcharacteristicId?: number,
  ) => void;
  onAddCharacteristic: () => void;
  onAddImage: () => void;
  onRemoveImage: (imageId: number) => void;
}

export interface ProductNotFoundProps {
  onSelectProduct: () => void;
}

export interface CharacteristicListProps {
  characteristics: Product['characteristics'];
  onAddCharacteristic: () => void;
  onRemoveCharacteristic: (
    characteristicId: number,
    subcharacteristicId?: number,
  ) => void;
}
