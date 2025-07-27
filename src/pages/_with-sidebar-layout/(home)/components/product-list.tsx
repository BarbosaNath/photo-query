import RowCard from '@components/row';
import Text from '@components/text';
import CharacteristicsList from './characteristics-list';
import ImageList from './image-list';
import { Product } from '@utils/dtos';

export default function ProductList({
  products,
  onEdit: handleEdit,
  onRemove: handleRemove,
}: {
  products: Product[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return products.map((product) => (
    <RowCard
      key={product.id}
      title={product.name}
      onEdit={() => handleEdit(product.id)}
      onRemove={() => handleRemove(product.id)}
    >
      <Text secondary size="xs">
        {product.category_name}
      </Text>

      {product.images && product.images.length > 0 && (
        <ImageList images={product.images} />
      )}

      {product.characteristics && product.characteristics.length > 0 && (
        <CharacteristicsList characteristics={product.characteristics} />
      )}
    </RowCard>
  ));
}
