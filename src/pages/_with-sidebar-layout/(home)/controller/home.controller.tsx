import Home from '../view/home.view';
import { Route } from '..';
import { useState } from 'react';

export default function HomeController() {
  const products = Route.useLoaderData();
  const redirect = Route.useNavigate();
  const [searchValue, setSearchValue] = useState('');

  console.log('Products:', products);

  const handleEdit = (id: number) => {
    console.log('Edit product with ID:', id);
    redirect({ to: `/product/${id}` });
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Home
      products={products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      )}
      searchValue={searchValue}
      onEdit={handleEdit}
      onRemove={() => {}}
      onChangeSearch={handleChangeSearch}
    />
  );
}
