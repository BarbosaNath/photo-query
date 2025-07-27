import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Stack from '@components/stack';
import Text from '@components/text';
import { ProductNotFoundProps } from '../types';
import CenterLayout from '@components/center-layout';

export default function ProductNotFound({
  onSelectProduct: handleSelectProduct,
}: ProductNotFoundProps) {
  return (
    <CenterLayout title="Detalhes do Produto" width={90}>
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
    </CenterLayout>
  );
}
