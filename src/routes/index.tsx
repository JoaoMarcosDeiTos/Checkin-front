// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import CreateResponsible from "../pages/CreateResponsible";
import AfterAddResponsible from "../pages/AfterAddResponsible";
import CreateOtherResponsible from "../pages/CreateOtherResponsible";
import CreateChild from "../pages/CreateChild";
import CheckinSteps from "../pages/CheckinSteps";
import EditMyData from "../pages/EditMyData";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-responsible" element={<CreateResponsible />} />
      <Route path="/other-responsible" element={<AfterAddResponsible />} />
      <Route
        path="/create-other-responsible"
        element={<CreateOtherResponsible />}
      />
      <Route path="/create-child" element={<CreateChild />} />
      <Route path="/checkin-steps" element={<CheckinSteps />} />
      <Route path="/edit-my-data" element={<EditMyData />} />
    </Routes>
  );
}
