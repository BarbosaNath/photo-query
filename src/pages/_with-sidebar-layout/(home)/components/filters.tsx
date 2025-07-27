import Card from '@components/card';
import Stack from '@components/stack';
import Pill from '@components/pill';
import { Fragment } from 'react/jsx-runtime';
import { FilterProps } from '../types';

export default function Filters({
  categories,
  characteristics,
  selectedCategory,
  selectedCharacteristics,
  onSelectCategory: handleSelectCategory,
  onSelectCharacteristic: handleSelectCharacteristic,
}: FilterProps) {
  return (
    <Card padding="lg" radius="md">
      <Stack space="sm" direction="row" fullWidth wrap>
        {categories.map((category) => (
          <Pill
            key={category.id}
            active={selectedCategory === category.id}
            disabled={
              selectedCategory !== null && selectedCategory !== category.id
            }
            hoverColor="success"
            onClick={() => handleSelectCategory(category.id)}
          >
            {category.name}
          </Pill>
        ))}

        {characteristics.map((characteristic) => (
          <Fragment key={characteristic.id}>
            {characteristic.subcharacteristics &&
            characteristic.subcharacteristics.length > 0 ? (
              characteristic.subcharacteristics.map((sub) => (
                <Pill
                  key={sub.id}
                  active={selectedCharacteristics?.some(
                    (item) =>
                      item.id === characteristic.id && item.subId === sub.id,
                  )}
                  hoverColor="success"
                  onClick={() =>
                    handleSelectCharacteristic(characteristic.id, sub.id)
                  }
                >
                  {characteristic.name}: {sub.name}
                </Pill>
              ))
            ) : (
              <Pill
                active={selectedCharacteristics?.some(
                  (item) => item.id === characteristic.id,
                )}
                hoverColor="success"
                onClick={() => handleSelectCharacteristic(characteristic.id)}
              >
                {characteristic.name}
              </Pill>
            )}
          </Fragment>
        ))}
      </Stack>
    </Card>
  );
}
