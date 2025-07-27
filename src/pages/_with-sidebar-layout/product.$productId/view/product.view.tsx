import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import CenterLayout from '@components/center-layout';
import Stack from '@components/stack';
import Text from '@components/text';
import { ProductPageProps } from '../types';

export default function Product({
  product,
  onSelectProduct: handleSelectProduct,
}: ProductPageProps) {
  return (
    <CenterLayout title="Detalhes do Produto" width={90}>
      {!product && (
        <Card>
          <Stack space="xxl" align="stretch">
            <Text justify>
              Selecione um produto na tela de pesquisa para visualizar os
              detalhes.
            </Text>

            <ButtonLayout
              primaryButton={
                <Button primary onClick={handleSelectProduct}>
                  Selecionar Produto
                </Button>
              }
            />
          </Stack>
        </Card>
      )}

      {product && (
        <>
          <Text as="h3">Product Details</Text>
          <Text>ID: {product.id}</Text>
          <Text>Name: {product.name}</Text>
        </>
      )}
    </CenterLayout>
  );
}
