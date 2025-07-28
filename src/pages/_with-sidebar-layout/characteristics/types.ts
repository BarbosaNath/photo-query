import { Characteristic } from '@utils/dtos';

export interface CharacteristicProps {
  characteristics: Array<Characteristic>;
  searchValue: string;
  errorMessage: string;
  editingCharacteristicId: number | null;
  isEditingCharacteristic: boolean;
  isCharacteristicDetailsOpen: boolean;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCharacteristic: (name: string) => void;
  handleRemoveCharacteristic: (id: number) => void;
  handleEditCharacteristic: (newName: string) => void;
  handleToggleEditCharacteristic: (id?: number) => void;
  handleClickCharacteristic: (id?: number) => void;
}
