import Home from '../view/home.view';
import { Route } from '..';
import { useEffect, useState } from 'react';
import { Product } from '@utils/dtos';
import { CharacteristicFilter } from '../types';

export default function HomeController() {
  const { products, categories, characteristics } = Route.useLoaderData();
  const [searchValue, setSearchValue] = useState('');
  const redirect = Route.useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    CharacteristicFilter[] | null
  >(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const applyFilters = async () => {
      const filter: {
        categoryId?: number;
        characteristics?: CharacteristicFilter[];
      } = {};

      if (selectedCategory !== null) filter.categoryId = selectedCategory;
      if (selectedCharacteristics && selectedCharacteristics.length > 0) {
        filter.characteristics = selectedCharacteristics;
      }

      const filteredProducts =
        Object.keys(filter).length > 0
          ? await window.electronAPI.invoke<Product[]>('get-products', filter)
          : products;

      setFilteredProducts(
        filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    };

    applyFilters();
  }, [
    searchValue,
    products,
    categories,
    characteristics,
    selectedCategory,
    selectedCharacteristics,
  ]);

  const handleEdit = (id: number) => {
    redirect({ to: `/product/${id}` });
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleSelectCharacteristic = (id: number, subId?: number) => {
    setSelectedCharacteristics((prev) => {
      if (!prev) return [{ id, subId }];

      const existing = prev.find(
        (item) => item.id === id && item.subId === subId,
      );

      if (!existing) return [...prev, { id: id, subId }];

      return prev.filter((item) => item.id !== id || item.subId !== subId);
    });
  };

  console.log('Filtered Products', filteredProducts);
  return (
    <Home
      products={filteredProducts}
      categories={categories}
      characteristics={characteristics}
      searchValue={searchValue}
      selectedCategory={selectedCategory}
      selectedCharacteristics={selectedCharacteristics}
      onEdit={handleEdit}
      onRemove={() => {}}
      onChangeSearch={handleChangeSearch}
      onSelectCategory={handleSelectCategory}
      onSelectCharacteristic={handleSelectCharacteristic}
    />
  );
}
