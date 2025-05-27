import CategoryCart from "../../../../../MainComonant/CategoryCard";

export default function SudanProduct() {
  const products = [
    { title: " محل ياسر" },
    { title: " محل ياسر" },
    { title: " محل ياسر" },
    { title: " محل ياسر" },
  ];
  return (
    <div className="w-full bg-gray-300 py-3">
      <div className="container m-auto">
        <div className="w-full pb-8 flex items-center space-x-4">
          <span className="flex-grow h-[2px] bg-black opacity-30" />
          <h2 className="text-xl lg:text-3xl font-bold font-heading text-center text-black whitespace-nowrap">
            المنتجات السودانية
          </h2>
          <span className="flex-grow h-[2px] bg-black opacity-30" />
        </div>
        <h1 className="text-center mb-5 font-bold text-2xl text-black">الأعلى مبيعا</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-black px-2">
          {products.map((el) => (
            <CategoryCart ounarName={el.title} />
          ))}
        </div>
        <div className="flex items-center justify-center py-5">
          <p className="cursor-pointer py-2 px-5 rounded-xl bg-black text-white">عرض الكل</p>
        </div>
      </div>
    </div>
  );
}
