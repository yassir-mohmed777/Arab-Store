import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
export default function NavHeader({catName}) {
  return (
    <div className="d-flex align-items-center gap-2 my-4">
      <Link className="nav-link"  to="/">
      <p className="m-0">الرئسية</p>
      </Link>
      <FaAngleLeft />
      <p className="m-0">الفئات</p>
      <FaAngleLeft />
      <p className="m-0">{catName}</p>
    </div>
  );
}
