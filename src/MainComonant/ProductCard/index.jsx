import FavoriteButton from "../FavoriteButton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // تأثير اختياري

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-accent-content transition p-4 flex flex-col cursor-pointer relative"
      onClick={onClick}
    >
      <div className="absolute right-1 top-1 z-50">
        <FavoriteButton productId={product.id} />
      </div>

      {/* ✅ صورة المنتج مع Lazy Load */}
      <div className="w-full h-[320px]  mb-4 overflow-hidden rounded-lg">
        <LazyLoadImage
          src={product.image_url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-[300px] object-cover rounded-xl"
          effect="blur" // تأثير اختياري
        />
      </div>

      {/* معلومات المنتج */}
      <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
        {product.name}
      </h3>
      <div className="mt-auto">
        <p className="text-green-600 font-bold text-lg">{product.price} CAD</p>
      </div>
    </div>
  );
}

