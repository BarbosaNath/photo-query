import Button from '@components/button';
import ButtonLayout from '@components/button-layout';
import Card from '@components/card';
import Select from '@components/select';
import { SelectOption } from '@components/select/types';
import Text from '@components/text';
import { useNavigate } from '@tanstack/react-router';
import { Characteristic, Product, Subcharacteristic } from '@utils/dtos';
import { useEffect, useState } from 'react';

export default function AddCharacteristic({
  product,
  onClose: handleClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const redirect = useNavigate();
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([]);
  const [selectedcharacteristic, setSelectedCharacteristic] =
    useState<Characteristic | null>(null);
  const [selectedSubcharacteristic, setSelectedSubcharacteristic] =
    useState<Subcharacteristic>();

  useEffect(() => {
    const fetchCharacteristics = async () => {
      const fetchedCharacteristics = await window.electronAPI.invoke<
        Characteristic[]
      >('get-characteristics');

      setCharacteristics(fetchedCharacteristics);
    };

    fetchCharacteristics();
  }, []);

  const handleSelectCharacteristic = (option: SelectOption) => {
    setSelectedCharacteristic(
      characteristics.find((c) => c.id === Number(option.value)) || null,
    );
  };

  const handleSelectSubCharacteristic = (option: SelectOption) => {
    if (!selectedcharacteristic?.subcharacteristics) return;

    setSelectedSubcharacteristic(
      selectedcharacteristic?.subcharacteristics.find(
        (s) => s.id === Number(option.value),
      ),
    );
  };

  const handleAddCharacteristic = () => {
    if (!selectedcharacteristic) return;

    window.electronAPI.invoke('add-product-characteristic', {
      productId: product.id,
      characteristicId: selectedcharacteristic.id,
      subcharacteristicId: selectedSubcharacteristic?.id,
    });

    handleClose();
    redirect({ to: '.' });
  };

  return (
    <Card>
      <Text>Adicionar caracteristica ao(à) {product.name}</Text>

      <Select
        options={characteristics.map((c) => ({
          label: c.name,
          value: c.id.toString(),
        }))}
        onOptionSelected={handleSelectCharacteristic}
        placeholder="Escolha uma característica"
      />

      {selectedcharacteristic &&
        selectedcharacteristic.subcharacteristics &&
        selectedcharacteristic.subcharacteristics.length > 0 && (
          <Select
            options={selectedcharacteristic.subcharacteristics.map((s) => ({
              label: s.name,
              value: s.id.toString(),
            }))}
            onOptionSelected={handleSelectSubCharacteristic}
            placeholder="Escolha uma subcaracterística"
          />
        )}

      <ButtonLayout
        primaryButton={
          <Button
            primary
            disabled={selectedcharacteristic === null}
            onClick={handleAddCharacteristic}
          >
            Adicionar
          </Button>
        }
        secondaryButton={
          <Button secondary onClick={handleClose}>
            Cancelar
          </Button>
        }
      />
    </Card>
  );
}
