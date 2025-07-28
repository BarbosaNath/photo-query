import { createFileRoute } from '@tanstack/react-router';
import ProductController from './controller/product.controller';
import { Category, Product } from '@utils/dtos';

export const Route = createFileRoute(
  '/_with-sidebar-layout/product/$productId/',
)({
  loader: async ({ params }) => {
    const productId =
      params.productId === 'undefined'
        ? sessionStorage.getItem('productId')
        : params.productId;

    if (!productId) return { product: undefined, categories: [] };

    sessionStorage.setItem('productId', productId);

    const [product, categories] = await Promise.all([
      window.electronAPI.invoke<Product>('get-product', {
        id: Number(productId),
      }),
      window.electronAPI.invoke<Category[]>('get-categories'),
    ]);

    console.log('ProductRouteLoader', { product, categories });
    return { product: productId ? product : undefined, categories };
  },
  component: ProductController,
});
