import CenterLayout from '@components/center-layout';
import Text from '@components/text';
import { ProductPageProps } from '../types';
import ProductNotFound from '../components/product-not-found';
import Card from '@components/card';
import Stack from '@components/stack';
import { PencilIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';
import Pill from '@components/pill';
import ImageList from '../components/image-list';

export default function Product({
  product,
  onSelectProduct: handleSelectProduct,
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
          <RefreshCwIcon size={14} cursor={'pointer'} />
        </Stack>

        {product.characteristics && product.characteristics.length > 0 && (
          <Stack space="xs" direction="row" align="center" fullWidth wrap>
            <Text>Caracteristicas: </Text>

            {product.characteristics.map((c) => (
              <Pill
                key={c.characteristicId}
                hoverColor="success"
                hoverComponent={
                  <>
                    {c.characteristicName}
                    {c.subcharacteristicName
                      ? `: ${c.subcharacteristicName}`
                      : ''}{' '}
                    <PencilIcon size={10} strokeWidth={2.5} />
                  </>
                }
              >
                {c.characteristicName}
                {c.subcharacteristicName ? `: ${c.subcharacteristicName}` : ''}
              </Pill>
            ))}

            <Pill hoverColor="success">
              <PlusIcon size={12} />
            </Pill>
          </Stack>
        )}

        <ImageList images={product.images} />

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
