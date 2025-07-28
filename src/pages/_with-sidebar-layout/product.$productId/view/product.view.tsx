import CenterLayout from '@components/center-layout';
import Text from '@components/text';
import { ProductPageProps } from '../types';
import ProductNotFound from '../components/product-not-found';
import Card from '@components/card';
import Stack from '@components/stack';
import { RefreshCwIcon } from 'lucide-react';
import ImageList from '../components/image-list';
import CharacteristicList from '../components/characteristic-list';

export default function Product({
  product,
  onSelectProduct: handleSelectProduct,
  onChangeCategory: handleChangeCategory,
  onAddCharacteristic: handleAddCharacteristic,
  onRemoveCharacteristic: handleRemoveCharacteristic,
  onAddImage: handleAddImage,
  onRemoveImage: handleRemoveImage,
}: ProductPageProps) {
  if (!product) {
    return <ProductNotFound onSelectProduct={handleSelectProduct} />;
  }

  return (
    <CenterLayout title="Detalhes do Produto" width={90}>
      <Card>
        <Text tertiary size="xs">
          ID: {product.id}
        </Text>

        <Text as="h3" size="lg" weight="bold">
          {product.name}
        </Text>

        <Stack align="center" space="xs" direction="row" fullWidth>
          <Text size="md">Categoria: {product.category_name}</Text>
          <RefreshCwIcon
            size={14}
            cursor={'pointer'}
            onClick={handleChangeCategory}
          />
        </Stack>

        {product.characteristics && product.characteristics.length > 0 && (
          <CharacteristicList
            characteristics={product.characteristics}
            onRemoveCharacteristic={handleRemoveCharacteristic}
            onAddCharacteristic={handleAddCharacteristic}
          />
        )}

        <ImageList
          images={product.images}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />

        <Stack space="xs">
          <Text tertiary size="xs">
            Criado em:{' '}
            {new Date(product.created_at).toLocaleDateString('pt-BR')}
          </Text>

          <Text tertiary size="xs">
            Atualizado em:{' '}
            {new Date(product.updated_at).toLocaleDateString('pt-BR')}
          </Text>
        </Stack>
      </Card>
    </CenterLayout>
  );
}
