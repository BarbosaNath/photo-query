import { Characteristic } from "@utils/dtos";

export interface CharacteristicProps {
  characteristics: Array<Characteristic>;
  searchValue: string;
  errorMessage: string;
  isEditingCharacteristic: boolean;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCharacteristic: (name: string) => void;
  handleRemoveCharacteristic: (id: number) => void;
  handleEditCharacteristic: () => void;
  handleToggleEditCharacteristic: (id?: number) => void;
}
