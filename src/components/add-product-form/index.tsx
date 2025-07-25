import Card from '@components/card';
import Text from '@components/text';
import Input from '@components/input';
import Select from '@components/select';
import { SelectOption } from '@components/select/types';
import { useCallback, useEffect, useState } from 'react';
import ButtonLayout from '@components/button-layout';
import Button from '@components/button';
import { Category, Product } from '@utils/dtos';
import { useNavigate } from '@tanstack/react-router';

export default function AddProductForm({
  onClose: handleClose,
}: {
  onClose: () => void;
}) {
  const [productName, setProductName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const redirect = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData =
          await window.electronAPI.invoke<Category[]>('get-categories');
        setCategories(categoriesData);
        console.log('Categories fetched:', categoriesData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleProductNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductName(event.target.value);
  };

  const handleSubmit = useCallback(async () => {
    if (!selectedCategory) {
      alert('Por favor, selecione uma categoria.');
      return;
    }

    const productData = {
      name: productName,
      categoryId: selectedCategory.id,
    };

    try {
      const newProduct = await window.electronAPI.invoke<Product>(
        'add-product',
        productData
      );
      console.log('Product added:', newProduct);
      handleClose();
      redirect({ to: '.' });
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  }, [productName, selectedCategory]);

  const handleSelectedCategoryChange = useCallback(
    (option: SelectOption) => {
      console.log('Selected option:', option);
      const selected = categories.find(
        (category) => category.id.toString() === option.value
      );
      console.log('Selected category:', selected);
      setSelectedCategory(selected || null);
    },
    [categories]
  );

  return (
    <Card
      form
      style={{ gap: 'var(--lds-spacing-xxl)' }}
      onSubmit={handleSubmit}
    >
      <Text secondary as="h2" size="lg" weight="bold">
        Adicionar Produto
      </Text>

      <Input
        placeholder="Nome do Produto"
        label="Nome do produto"
        type="text"
        name="productName"
        onChange={handleProductNameChange}
        value={productName}
      />

      <Select
        label="Categoria do produto"
        options={categories.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }))}
        placeholder="Selecione uma categoria"
        onOptionSelected={handleSelectedCategoryChange}
      />

      <ButtonLayout
        primaryButton={
          <Button primary type="submit">
            Adicionar
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
