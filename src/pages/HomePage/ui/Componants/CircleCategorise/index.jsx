import { useNavigate } from "react-router-dom";

export default function CircleCategorise({ categories }) {
  const navigate = useNavigate()
  return (
    <div className="w-full  bg-gray-300">
      <div className="container m-auto">
        <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-3 px-2  py-6 cursor-pointer">
          {categories.map((item) => (
            <div key={item.id} className="flex flex-col items-center" onClick={() => navigate(`/category/${item.id}`)}>
              <div className="bg-white w-[150px] h-[150px] rounded-full overflow-hidden flex flex-col items-center justify-center text-center mx-auto shadow-md">
                <img
                  className="w-full h-full object-cover mb-2 hover:scale-110 duration-300"
                  src={item.image_url}
                  alt={item.name}
                />
              </div>
              <p className="font-bold text-sm text-black">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
