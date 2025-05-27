import { Outlet } from "react-router-dom";
import Header from "../../MainComonant/Header";

export default function MainLayout() {
  return (
    <div>
        <Header />

        <Outlet />
    </div>
  )
}
