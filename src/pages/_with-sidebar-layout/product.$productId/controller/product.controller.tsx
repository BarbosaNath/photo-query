import { useState } from 'react';
import { Route } from '..';
import Product from '../view/product.view';
import { ProductPageProps } from '../types';

export default function ProductController() {
  const product = Route.useLoaderData();
  const redirect = Route.useNavigate();

  const [whichModalIsOpen, setWhichModalIsOpen] =
    useState<ProductPageProps['whichModalIsOpen']>(null);

  const handleChangeModal = (
    modalType: ProductPageProps['whichModalIsOpen'],
  ) => {
    setWhichModalIsOpen((prev) => (prev === modalType ? null : modalType));
  };

  const handleRemoveImage = (imageId: number) => {
    window.electronAPI.invoke('remove-product-image', {
      id: imageId,
    });
    redirect({ to: '.' });
  };

  const handleRemoveCharacteristic = (
    characteristicId: number,
    subcharacteristicId?: number,
  ) => {
    window.electronAPI.invoke('remove-product-characteristic', {
      productId: product!.id,
      characteristicId,
      subcharacteristicId,
    });
    redirect({ to: '.' });
  };

  return (
    <Product
      product={product}
      whichModalIsOpen={whichModalIsOpen}
      onSelectProduct={() => redirect({ to: '/' })}
      onChangeCategory={() => handleChangeModal('change-category')}
      onAddCharacteristic={() => handleChangeModal('add-characteristic')}
      onAddImage={() => handleChangeModal('add-image')}
      onRemoveCharacteristic={handleRemoveCharacteristic}
      onRemoveImage={handleRemoveImage}
    />
  );
}
