import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";

const Admin = lazy(() => import("./pages/Admin.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
            <Admin />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
