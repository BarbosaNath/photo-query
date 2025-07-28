import Categories from '../view/characteristics.view';
import { Route } from '..';
import { useState } from 'react';
import { Characteristic } from '@utils/dtos';

export default function CategoriesController() {
  const characteristics = Route.useLoaderData();
  const redirect = Route.useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditingCharacteristic, setIsEditingCharacteristic] =
    useState<boolean>(false);
  const [editingCharacteristicId, setEditingCharacteristicId] = useState<
    number | null
  >(null);

  const [isCharacteristicDetailsOpen, setIsCharacteristicDetailsOpen] =
    useState<boolean>(false);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setSearchValue(event.target.value);
  };

  const handleAddCategory = async (name: string) => {
    if (!name.trim()) {
      setErrorMessage('Nome da característica não pode ser vazio.');
      return;
    }

    const newCategory = await window.electronAPI.invoke<Characteristic>(
      'add-characteristic',
      {
        name: name.trim(),
      },
    );

    console.log('Característica adicionada:', newCategory);
    setErrorMessage('');
    setSearchValue('');
    redirect({ to: '.' });
  };

  const handleRemoveCategory = async (id: number) => {
    if (!id) {
      setErrorMessage('ID da característica não pode ser vazio.');
      return;
    }

    try {
      await window.electronAPI.invoke('remove-characteristic', { id });
      console.log(`Característica com ID ${id} removida.`);
      setErrorMessage('');
      redirect({ to: '.' });
    } catch (error) {
      setErrorMessage('Erro ao remover característica.');

      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        (error as { message: string }).message.includes(
          'FOREIGN KEY constraint failed',
        )
      ) {
        setErrorMessage(
          'Não é possível remover uma característica que possui produtos associados.',
        );
      }
      console.error('Erro ao remover característica:', error);
    }
  };

  const handleEditCategory = async (newName: string) => {
    if (!editingCharacteristicId) {
      setErrorMessage('ID da característica não pode ser vazio.');
      return;
    }

    if (!searchValue) {
      setErrorMessage('Nome da característica não pode ser vazio.');
      return;
    }

    try {
      await window.electronAPI.invoke('update-characteristic', {
        id: editingCharacteristicId,
        newName,
      });
      console.log(
        `Característica com ID ${editingCharacteristicId} editada para: ${newName}`,
      );
      setEditingCharacteristicId(null);
      setIsEditingCharacteristic(false);
      setSearchValue('');
      setErrorMessage('');
      redirect({ to: '.' });
    } catch (error) {
      setErrorMessage('Erro ao editar característica.');
      console.error('Erro ao editar característica:', error);
    }
  };

  const handleClickCharacteristic = (id?: number) => {
    setIsCharacteristicDetailsOpen((prev) => !prev);
    setEditingCharacteristicId(id ?? null);
  };

  return (
    <Categories
      characteristics={characteristics.filter((characteristic) =>
        characteristic.name.toLowerCase().includes(searchValue.toLowerCase()),
      )}
      searchValue={searchValue}
      errorMessage={errorMessage}
      isEditingCharacteristic={isEditingCharacteristic}
      isCharacteristicDetailsOpen={isCharacteristicDetailsOpen}
      editingCharacteristicId={editingCharacteristicId}
      handleChangeSearch={handleChangeSearch}
      handleAddCharacteristic={handleAddCategory}
      handleRemoveCharacteristic={handleRemoveCategory}
      handleEditCharacteristic={handleEditCategory}
      handleToggleEditCharacteristic={(id?: number) => {
        setIsEditingCharacteristic(!!id);
        setEditingCharacteristicId(id ?? null);
      }}
      handleClickCharacteristic={handleClickCharacteristic}
    />
  );
}
