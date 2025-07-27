import CenterLayout from '@components/center-layout';
import Text from '@components/text';
import { Route } from '..';
import Card from '@components/card';

export default function ProductController() {
  const product = Route.useLoaderData();

  console.log('Product:', product);

  return (
    <CenterLayout title="Detalhes do Produto" width={90}>
      {!product && (
        <Card>
          <Text justify>
            Selecione um produto na tela de pesquisa para visualizar os
            detalhes.
          </Text>
        </Card>
      )}

      {product && (
        <>
          <h1>Product Details</h1>
          <p>ID: {product.id}</p>
          <p>Name: {product.name}</p>
        </>
      )}
    </CenterLayout>
  );
}
