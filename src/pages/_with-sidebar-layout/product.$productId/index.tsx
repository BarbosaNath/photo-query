import { createFileRoute } from '@tanstack/react-router';
import ProductController from './controller/product.controller';
import { Product } from '@utils/dtos';

export const Route = createFileRoute(
  '/_with-sidebar-layout/product/$productId/',
)({
  loader: async ({ params }) => {
    const productId =
      params.productId === 'undefined'
        ? sessionStorage.getItem('productId')
        : params.productId;

    if (!productId) return undefined;

    sessionStorage.setItem('productId', productId);

    return window.electronAPI.invoke<Product>('get-product', {
      id: Number(productId),
    });
  },
  component: ProductController,
});
