import ProductCard from "../../../../../MainComonant/ProductCard";

const mockStores = [
  { id: 1, name: "متجر ياسر" },
  { id: 2, name: "متجر أمينة" },
  { id: 3, name: "متجر خالد" },
];

const mockProducts = [
  { id: 1, name: "فول سوداني", price: 80, discountedPrice: 50, storeId: 1 },
  { id: 2, name: "صابون طبيعي", price: 100, discountedPrice: 70, storeId: 2 },
  { id: 3, name: "بخور", price: 60, discountedPrice: 40, storeId: 3 },
  { id: 3, name: "بخور", price: 60, discountedPrice: 40, storeId: 3 },
  { id: 3, name: "بخور", price: 60, discountedPrice: 40, storeId: 3 },
  { id: 3, name: "بخور", price: 60, discountedPrice: 40, storeId: 3 },
  {
    id: 4,
    name: "منتج بدون خصم",
    price: 50,
    discountedPrice: null,
    storeId: 3,
  },
];

export default function ProductOffers() {
  const offers = mockProducts
    .filter((product) => product.discountedPrice)
    .map((product) => {
      const store = mockStores.find((s) => s.id === product.storeId);
      return {
        productName: product.name,
        discountedPrice: product.discountedPrice,
        storeName: store ? store.name : "غير معروف",
      };
    });

  return (
    <div className="bg-gray-300">
      <div className="container m-auto text-black">
        
        <div className="w-full pb-8 flex items-center space-x-4">
          <span className="flex-grow h-[2px] bg-black opacity-30" />
          <h2 className="text-xl lg:text-3xl font-bold font-heading text-center whitespace-nowrap">
            العروض
          </h2>
          <span className="flex-grow h-[2px] bg-black opacity-30" />
        </div>

        {offers.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد عروض حالياً</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {offers.map((offer, index) => (
              <ProductCard
                name={offer.storeName}
                price={offer.discountedPrice}
              />
            ))}
          </div>
        )}
        <div className="flex items-center justify-center py-5">
          <p className="cursor-pointer py-2 px-5 rounded-xl bg-black text-white">
            عرض الكل
          </p>
        </div>
      </div>
    </div>
  );
}
