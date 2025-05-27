import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function MinHeader({ productName, catName, catId }) {
  return (
    <div className="d-flex align-items-center flex-wrap gap-2 my-4">
      <Link className="nav-link" to='/'>
      <p className="m-0">الرئيسية</p>
      </Link>
      <FaAngleLeft />
      <Link className="nav-link" to={`/categories/${catId}`}>
      <p className="m-0">الفئات</p>
      </Link>
      <FaAngleLeft />
      <Link className="nav-link" to={`/categories/${catId}`}>
        <p className="m-0">{catName}</p>
      </Link>
      <FaAngleLeft />
      <p className="m-0">{productName}</p>
    </div>
  );
}
