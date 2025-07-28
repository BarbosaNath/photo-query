import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Input from '@components/input';
import Text from '@components/text';
import { useNavigate } from '@tanstack/react-router';
import { Product } from '@utils/dtos';
import { useState } from 'react';
import { Buffer } from 'buffer';

export default function AddImage({
  product,
  onClose: handleClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const redirect = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log('Selected file:', file);
    if (!file) return;

    setSelectedImage(file);
  };

  const handleAddImage = async () => {
    if (!selectedImage) return;

    const arrayBuffer = await selectedImage.arrayBuffer();

    await window.electronAPI.invoke('add-product-image', {
      productId: product.id,
      imageFile: Buffer.from(arrayBuffer),
    });

    handleClose();
    redirect({ to: '.' });
  };

  return (
    <Card>
      <Text>Adicionar ao(à) {product.name}</Text>

      <Input type="file" value="" onChange={handleChangeImage} />

      <ButtonLayout
        primaryButton={
          <Button primary onClick={handleAddImage} disabled={!selectedImage}>
            Salvar
          </Button>
        }
        secondaryButton={
          <Button secondary onClick={handleClose}>
            Cancelar
          </Button>
        }
      />
    </Card>
  );
}
