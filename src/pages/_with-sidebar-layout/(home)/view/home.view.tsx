import CenterLayout from '@components/center-layout';
import Stack from '@components/stack';
import { HomeProps } from '../types';
import Filters from '../components/filters';
import ProductList from '../components/product-list';
import SearchBar from '../components/search-bar';

export default function Home({
  products,
  categories,
  characteristics,
  searchValue,
  selectedCategory,
  selectedCharacteristics,
  onEdit: handleEdit,
  onRemove: handleRemove,
  onChangeSearch: handleChangeSearch,
  onSelectCategory: handleSelectCategory,
  onSelectCharacteristic: handleSelectCharacteristic,
}: HomeProps) {
  return (
    <>
      <CenterLayout title="Produtos" width={90}>
        <Stack align="stretch">
          <SearchBar
            searchValue={searchValue}
            onChangeSearch={handleChangeSearch}
          />

          <Filters
            categories={categories}
            characteristics={characteristics}
            selectedCategory={selectedCategory}
            selectedCharacteristics={selectedCharacteristics}
            onSelectCategory={handleSelectCategory}
            onSelectCharacteristic={handleSelectCharacteristic}
          />

          <ProductList
            products={products}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </Stack>
      </CenterLayout>
    </>
  );
}
