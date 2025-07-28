import Card from '@components/card';
import Select from '@components/select';
import Text from '@components/text';
import { ChangeCategoryProps } from '../types';
import Button from '@components/button';
import { useState } from 'react';
import { SelectOption } from '@components/select/types';
import ButtonLayout from '@components/button-layout';
import { useNavigate } from '@tanstack/react-router';

export default function ChangeCategory({
  product,
  categories,
  onClose: handleClose,
}: ChangeCategoryProps) {
  const redirect = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (option: SelectOption) => {
    setSelectedCategory(Number(option.value));
  };

  const handleSubmitChangeCategory = () => {
    if (selectedCategory === null) return;

    window.electronAPI.invoke('update-product-category', {
      id: product.id,
      categoryId: selectedCategory,
    });

    handleClose();
    redirect({ to: '.' });
  };

  return (
    <Card>
      <Text>Mudar Categoria do(a) {product.name}</Text>

      <Select
        options={categories.map((c) => ({
          label: c.name,
          value: c.id.toString(),
        }))}
        onOptionSelected={handleSelectCategory}
        placeholder="Escolha uma categoria"
      />

      <ButtonLayout
        primaryButton={
          <Button
            primary
            disabled={selectedCategory === null}
            onClick={handleSubmitChangeCategory}
          >
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
