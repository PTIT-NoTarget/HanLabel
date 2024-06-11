import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import LabelPage from "../../label/components/LabelPage";

export const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/label',
    component: LabelPage,
    exact: true,
  },
  {
    path: '/about',
    component: AboutPage,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];