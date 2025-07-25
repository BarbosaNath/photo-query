import Button from '@components/button';
import CenterLayout from '@components/center-layout';
import Input from '@components/input';
import Stack from '@components/stack';
import { PlusIcon } from 'lucide-react';
import Text from '@components/text';
import Modal from '@components/modal';
import RowCard from '@components/row';
import { CharacteristicProps } from '../types';
import EditForm from '../components/edit-form';
import CharacteristicDetails from '../components/characteristic-details';

export default function Categories({
  characteristics,
  searchValue,
  errorMessage,
  isEditingCharacteristic,
  editingCharacteristicId,
  isCharacteristicDetailsOpen,
  handleChangeSearch,
  handleAddCharacteristic,
  handleRemoveCharacteristic,
  handleEditCharacteristic,
  handleToggleEditCharacteristic,
  handleClickCharacteristic,
}: CharacteristicProps) {
  return (
    <>
      <Modal
        isOpen={isEditingCharacteristic}
        onClose={() => handleToggleEditCharacteristic()}
      >
        <EditForm
          onClose={handleToggleEditCharacteristic}
          onEditCharacteristic={handleEditCharacteristic}
        />
      </Modal>

      <Modal
        isOpen={isCharacteristicDetailsOpen}
        onClose={() => handleClickCharacteristic()}
      >
        <CharacteristicDetails
          id={editingCharacteristicId ?? undefined}
          onClose={handleClickCharacteristic}
        />
      </Modal>

      <CenterLayout title="Características" width={80} justify="start">
        <Stack fullWidth align="stretch" space="xxl">
          <Stack direction="row">
            <Input
              placeholder="Digite para buscar ou adicionar"
              value={searchValue}
              onChange={handleChangeSearch}
            />

            <Button
              primary
              onClick={() => handleAddCharacteristic(searchValue)}
            >
              <PlusIcon size={12} strokeWidth={4} /> ADICIONAR
            </Button>
          </Stack>

          {Boolean(errorMessage) && (
            <Text error size="xs">
              {errorMessage}
            </Text>
          )}

          <Stack>
            {characteristics.map((characteristic) => (
              <RowCard
                key={characteristic.name}
                title={characteristic.name}
                onClick={() => handleClickCharacteristic(characteristic.id)}
                onRemove={() => handleRemoveCharacteristic(characteristic.id)}
                onEdit={() => handleToggleEditCharacteristic(characteristic.id)}
              />
            ))}
          </Stack>
        </Stack>
      </CenterLayout>
    </>
  );
}
