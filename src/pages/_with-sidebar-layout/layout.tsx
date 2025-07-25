import Sidebar from '@components/sidebar';
import Stack from '@components/stack';
import { createFileRoute, Outlet /*, redirect*/ } from '@tanstack/react-router';

export const Route = createFileRoute('/_with-sidebar-layout')({
  beforeLoad: () => {
    // if (!sessionStorage.getItem("isLogged")) throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack
      direction="row"
      space="none"
      align="stretch"
      wrap="mobile"
      fullHeight
    >
      <Sidebar />

      <Outlet />
    </Stack>
  );
}
