import { Routes, Route } from "react-router-dom";
import { Events, Home, Volunteer } from "../pages";
import { Header } from "../components";

export const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteer/:voluneerId" element={<></>} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<></>} />
      </Routes>
    </>
  );
};
