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
  OTHERS,
  REGISTRATION,
} from "../../utils/constants/routeConstants";
import DashRoutes from "../Layouts/MainLayout";
import DiseasePredictionSym from "../../pages/dashboards/DiseasePredictionSym";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import CancerPrediction from "../../pages/CancerPrediction/CancerPrediction";

const MyRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={BASE} element={<WelcomeLayout />}>

      <Route path={REGISTRATION} element={<Registration />} />
      <Route path={LOGIN} element={<Login />} />

      <Route path={DASHBOARD} element={<DashRoutes />}>
        <Route path={DISEASEPREDICTIONSYM} element={<DiseasePredictionSym />} />
        <Route path={CANCERPREDICTION} element={<CancerPrediction />} />
      </Route>
      
      <Route path={OTHERS} element={<NoteFoundPageError />} />
    </Route>
  )
);
export default MyRoutes;
