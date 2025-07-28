import { createFileRoute } from '@tanstack/react-router';
import HomeController from './controller/home.controller';
import LoadingPage from '@components/loading-page';
import { Category, Characteristic, Product } from '@utils/dtos';

export const Route = createFileRoute('/_with-sidebar-layout/(home)/')({
  loader: async () => {
    const [products, categories, characteristics] = await Promise.all([
      window.electronAPI.invoke<Product[]>('get-products'),
      window.electronAPI.invoke<Category[]>('get-categories'),
      window.electronAPI.invoke<Characteristic[]>('get-characteristics'),
    ]);

    return { products, categories, characteristics };
  },
  pendingComponent: LoadingPage,
  component: HomeController,
});

export default HomeController;
