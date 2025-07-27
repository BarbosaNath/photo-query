import { Route } from '..';
import Product from '../view/product.view';

export default function ProductController() {
  const product = Route.useLoaderData();
  const redirect = Route.useNavigate();

  return (
    <Product product={product} onSelectProduct={() => redirect({ to: '/' })} />
  );
}
