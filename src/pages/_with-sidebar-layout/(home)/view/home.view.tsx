import CenterLayout from '@components/center-layout';
import RowCard from '@components/row';
import Stack from '@components/stack';
import Text from '@components/text';
import { Product } from '@utils/dtos';

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <CenterLayout width={90}>
        <Stack>
          {products.map((product) => (
            <>
              <RowCard
                key={product.id}
                title={product.name}
                onEdit={() => console.log('Edit', product.id)}
                onRemove={() => console.log('Remove', product.id)}
              >
                <Text tertiary size="xs">
                  {product.updated_at}
                </Text>

                <Stack direction="row" space="sm" fullWidth>
                  {product.characteristics &&
                    product.characteristics.map((characteristics, index) => (
                      <Text
                        tertiary
                        size="xs"
                        key={characteristics.characteristicId}
                      >
                        {characteristics.characteristicName}

                        {characteristics.subcharacteristicName
                          ? `: ${characteristics.subcharacteristicName}`
                          : ''}

                        {product.characteristics &&
                        index < product.characteristics.length - 1
                          ? ', '
                          : ''}
                      </Text>
                    ))}
                </Stack>

                <Stack direction="row" fullWidth>
                  {product.images &&
                    product.images.map((image) => (
                      <img
                        key={image.id}
                        src={image.image_url}
                        alt={'Product Image'}
                        style={{
                          width: '150px',
                          height: '200px',
                          borderRadius: 'var(--lds-radius)',
                          objectFit: 'cover',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 25%)',
                        }}
                      />
                    ))}
                </Stack>
              </RowCard>
            </>
          ))}
        </Stack>
      </CenterLayout>
    </>
  );
}
