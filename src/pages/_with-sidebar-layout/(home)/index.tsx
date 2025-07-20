import { createFileRoute } from "@tanstack/react-router";
import HomeController from "./controller/home.controller";
import LoadingPage from "@components/loading-page";

export const Route = createFileRoute("/_with-sidebar-layout/(home)/")({
  pendingComponent: LoadingPage,
  component: HomeController,
});

export default HomeController;
