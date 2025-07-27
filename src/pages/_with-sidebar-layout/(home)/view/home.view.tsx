import CenterLayout from '@components/center-layout';
import RowCard from '@components/row';
import Stack from '@components/stack';
import Text from '@components/text';
import { HomeProps } from '../types';
import Input from '@components/input';
import { SearchIcon } from 'lucide-react';
import Button from '@components/button';
import Card from '@components/card';
import Pill from '@components/pill';
import { Fragment } from 'react/jsx-runtime';

export default function Home({
  products,
  categories,
  characteristics,
  searchValue,
  onEdit: handleEdit,
  onRemove: handleRemove,
  onChangeSearch: handleChangeSearch,
}: HomeProps) {
  return (
    <>
      <CenterLayout title="Produtos" width={90}>
        <Stack align="stretch">
          <Stack direction="row">
            <Input
              placeholder="Digite para buscar"
              value={searchValue}
              onChange={handleChangeSearch}
            />
            <Button primary onClick={() => {}}>
              <SearchIcon size={12} strokeWidth={4} /> BUSCAR
            </Button>
          </Stack>

          <Card padding="lg" radius="md">
            <Stack space="sm" direction="row" fullWidth wrap>
              {categories.map((category) => (
                <Pill key={category.id}>{category.name}</Pill>
              ))}

              {characteristics.map((characteristic) => (
                <Fragment key={characteristic.id}>
                  {characteristic.subcharacteristics &&
                  characteristic.subcharacteristics.length > 0 ? (
                    characteristic.subcharacteristics.map((sub) => (
                      <Pill key={sub.id}>
                        {characteristic.name}: {sub.name}
                      </Pill>
                    ))
                  ) : (
                    <Pill>{characteristic.name}</Pill>
                  )}
                </Fragment>
              ))}
            </Stack>
          </Card>

          {products.map((product) => (
            <>
              <RowCard
                key={product.id}
                title={product.name}
                onEdit={() => handleEdit(product.id)}
                onRemove={() => handleRemove(product.id)}
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
