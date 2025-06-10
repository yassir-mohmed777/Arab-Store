export default function OfferCard({ name, price, image, originalPrice ,storeName ,discountPercentage , discountValue}) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 cursor-pointer flex flex-col items-center text-center">
      <h3 className="text-center">{storeName}</h3>
      <div className="w-full h-[180px] overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h4 className="font-semibold text-lg text-gray-800 truncate mb-1">{name}</h4>

      <div className="flex items-center gap-2">
        <p className="text-black text-lg font-bold">{price}CAD</p>
        {originalPrice && (
          <p className="text-gray-400 text-[14px] line-through">{originalPrice}CAD</p>
        )}
        <p className="text-green-600 text-[14px] font-bold">خصم %{discountPercentage}</p>
      </div>
      {originalPrice && price && originalPrice > price && (
    <div className=" bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded border border-green-500 shadow-sm whitespace-nowrap">
      خصم {(originalPrice - price).toLocaleString()} جنيه
    </div>
  )}
    </div>
  );
}
