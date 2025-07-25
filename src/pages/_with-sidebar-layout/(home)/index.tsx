import { createFileRoute } from "@tanstack/react-router";
import HomeController from "./controller/home.controller";
import LoadingPage from "@components/loading-page";
import { Product } from "@utils/dtos";

export const Route = createFileRoute("/_with-sidebar-layout/(home)/")({
  loader: async () => window.electronAPI.invoke<Product[]>("get-products"),
  pendingComponent: LoadingPage,
  component: HomeController,
});

export default HomeController;
