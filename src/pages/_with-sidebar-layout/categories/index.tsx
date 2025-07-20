import { createFileRoute } from "@tanstack/react-router";
import CategoriesController from "./controller/categories.controller";
import LoadingPage from "@components/loading-page";

export const Route = createFileRoute("/_with-sidebar-layout/categories/")({
  pendingComponent: LoadingPage,
  component: CategoriesController,
});
