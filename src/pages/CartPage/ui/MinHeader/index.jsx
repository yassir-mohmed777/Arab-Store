import { FaAngleLeft } from "react-icons/fa";
export default function MinHeader() {
  return (
    <div className="d-flex align-items-center gap-2 my-4">
      <p className="m-0">الرئيسية</p>
      <FaAngleLeft />
      <p className="m-0">السلة</p>
    </div>
  );
}
