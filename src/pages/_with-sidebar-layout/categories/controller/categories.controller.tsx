import Categories from "../view/categories.view";

export default function CategoriesController() {
  return (
    <Categories
      categories={[]}
      searchValue={""}
      errorMessage={""}
      handleChangeSearch={() => {}}
      handleAddCategory={() => {}}
      handleRemoveCategory={() => {}}
      handleEditCategory={() => {}}
    />
  );
}
