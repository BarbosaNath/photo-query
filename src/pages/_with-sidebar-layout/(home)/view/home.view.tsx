import CenterLayout from "@components/center-layout";
import Stack from "@components/stack";
import Text from "@components/text";
import { Product } from "@utils/dtos";

export default function Home({ products }: { products: Product[] }) {
  return (
    <CenterLayout width={90}>
      <Stack>
        {products.map((product) => (
          <>
            <Text weight="bold" key={product.id}>
              {product.name}
            </Text>
            <Text weight="light">{product.category_name}</Text>

            <Text secondary size="xs">
              {product.characteristics &&
                product.characteristics.length > 0 && (
                  <Text secondary as="span" size="xs">
                    {` | `}
                  </Text>
                )}
              {product.characteristics?.map((char) => (
                <Text secondary as="span" size="xs" key={char.characteristicId}>
                  {char.characteristicName} - {char.subcharacteristicName}
                  {` | `}
                </Text>
              ))}
            </Text>
          </>
        ))}
      </Stack>
    </CenterLayout>
  );
}
