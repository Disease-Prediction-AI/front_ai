import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import WelcomeLayout from "../Layouts/welcomeLayout";
import NoteFoundPageError from "../ErrorsPages/PageNoteFound";
import {
  BASE,
  CANCERPREDICTION,
  DASHBOARD,
  DISEASEPREDICTIONSYM,
  LOGIN,
  PNEUMONIADICTION,
  OTHERS,
  REGISTRATION,
} from "../../utils/constants/routeConstants";
import DashRoutes from "../Layouts/MainLayout";
import DiseasePredictionSym from "../../pages/dashboards/DiseasePredictionSym";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import CancerPrediction from "../../pages/CancerPrediction/CancerPrediction";
import Contact from "../dragAndDrop";
import PrivateRoute from "./PrivateRoute";

const MyRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE} element={<WelcomeLayout />}>
      <Route path={REGISTRATION} element={<Registration />} />
      <Route path={LOGIN} element={<Login />} />

      <Route
        path={DASHBOARD}
        element={
          <PrivateRoute>
            <DashRoutes />
          </PrivateRoute>
        }
      >
        <Route path={DISEASEPREDICTIONSYM} element={<DiseasePredictionSym />} />
        <Route path={CANCERPREDICTION} element={<CancerPrediction />} />
        <Route path={PNEUMONIADICTION} element={<Contact />} />
      </Route>

      <Route path={OTHERS} element={<NoteFoundPageError />} />
    </Route>
  )
);
export default MyRoutes;
