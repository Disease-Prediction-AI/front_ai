import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import WelcomeLayout from "../Layouts/welcomeLayout";
import NoteFoundPageError from "../ErrorsPages/PageNoteFound";
import {
  BASE,
  DASHBOARD,
  DISEASEPRIDICTIONSYM,
  OTHERS,
} from "../../utils/constants/routeConstants";
import DashRoutes from "../Layouts/MainLayout";
import DiseasePridictionSym from "../../pages/dashboards/DiseasePridictionSym";

const MyRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE} element={<WelcomeLayout />}>
      <Route path={DASHBOARD} element={<DashRoutes />}>
        <Route path={DISEASEPRIDICTIONSYM} element={<DiseasePridictionSym />} />
      </Route>
      <Route path={OTHERS} element={<NoteFoundPageError />} />
    </Route>
  )
);
export default MyRoutes;
