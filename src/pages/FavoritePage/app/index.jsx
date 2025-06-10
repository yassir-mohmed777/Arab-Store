import { useEffect, useState } from "react";
import favoriteNull from "../../../assets/no-favorites.jpg";
import { ProductsRepo } from "../../../data/repos/Products_Repo";
import { useFavorite } from "../../../zustand-store/favorites";
import ProductCard from "../../../MainComonant/ProductCard";
import { useNavigate } from "react-router-dom";
export default function FavoritePage() {
  const [products, setProducts] = useState();
  const { favorites } = useFavorite();
  const navigaet = useNavigate()
  useEffect(() => {
    ProductsRepo.product_favorite(favorites).then((res) => {
      setProducts(res);
      console.log(res)
    });
  }, [favorites]);

  return (
    <div className="w-full h-[calc(100vh-90px)]">
      <p className="text-center py-4 bg-black text-white font-bold ">
        قائمة المفضلة
      </p>
      <div className="container mx-auto py-5">
        {favorites.length == 0 ? (
          <div className="text-center flex items-center justify-center flex-col">
            <p className="text-gray-400 font-bold text-3xl">لا يوجد !</p>
            <img src={favoriteNull} className=" img-fluid w-1/2 h-[350px]" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {products?.map((el) => (
              <ProductCard key={el.id} product={el} onClick={()=> navigaet(`/product/${el.id}`)}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
