import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import WelcomeLayout from "../Layouts/welcomeLayout";
import CodeRevieweRoutes from "../Layouts/MainLayout";
import NoteFoundPageError from "../ErrorsPages/PageNoteFound";
import { BASE, DASHBOARD, OTHERS } from "../../utils/constants/routeConstants";

  
  const MyRoutes = createBrowserRouter(
    createRoutesFromElements(
      <Route  path={BASE} element={<WelcomeLayout />}>
        <Route path={DASHBOARD} element={<CodeRevieweRoutes />}>
  
        </Route>
        <Route path={OTHERS} element={<NoteFoundPageError />} />
      </Route>
    )
  );
  export default MyRoutes;
  