import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Suspense } from "react";
import Loading from "./Loading";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
