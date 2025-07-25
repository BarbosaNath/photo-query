import { Category } from "@utils/dtos";

export interface CategoryProps {
  categories: Array<Category>;
  searchValue: string;
  errorMessage: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCategory: (name: string) => void;
  handleRemoveCategory: (id: number) => void;
  handleEditCategory: (id: number) => void;
}

export interface CategoryRowProps {
  name: string;
  handleRemoveCategory: () => void;
  handleEditCategory: () => void;
}
