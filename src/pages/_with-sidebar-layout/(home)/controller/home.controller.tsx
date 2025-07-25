import Home from "../view/home.view";
import { Route } from "..";

export default function HomeController() {
  const products = Route.useLoaderData();
  console.log("Products:", products);
  return <Home products={products} />;
}
