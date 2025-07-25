import { createFileRoute } from '@tanstack/react-router';
import CharacteristicsController from './controller/characteristics.controller';
import LoadingPage from '@components/loading-page';
import { Characteristic } from '@utils/dtos';

export const Route = createFileRoute('/_with-sidebar-layout/characteristics/')({
  loader: async () =>
    window.electronAPI.invoke<Characteristic[]>('get-characteristics'),
  pendingComponent: LoadingPage,
  component: CharacteristicsController,
});
