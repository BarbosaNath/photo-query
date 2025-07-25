import { createFileRoute } from '@tanstack/react-router';
import CategoriesController from './controller/categories.controller';
import LoadingPage from '@components/loading-page';
import { Category } from '@utils/dtos';

export const Route = createFileRoute('/_with-sidebar-layout/categories/')({
  loader: async () => window.electronAPI.invoke<Category[]>('get-categories'),
  pendingComponent: LoadingPage,
  component: CategoriesController,
});
