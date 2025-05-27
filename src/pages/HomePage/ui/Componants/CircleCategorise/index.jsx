export default function CircleCategorise() {
  return (
    <div className="w-full  bg-gray-300">
      <div className="container m-auto">
        <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-3 px-2  py-6 ">
          {[
            { title: "المنتجات السودانية", imgHeight: "150px" },
            { title: "العطور", imgHeight: "120px" },
            { title: "الملابس", imgHeight: "120px" },
            { title: "الاكسسوارات", imgHeight: "120px" },
            { title: "الاكسسوارات", imgHeight: "120px" },
            { title: "الاكسسوارات", imgHeight: "120px" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-center mx-auto shadow-md"
            >
              <img
                className="w-[80px] h-[80px] object-cover mb-2"
                //   alt={item.title}
              />
              <p className="font-bold text-sm text-black">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
