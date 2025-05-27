import { useEffect, useState } from "react";
import favoriteNull from "../../../assets/no-favorites.jpg";
import ProductCard from "../../../MainComonant/ProductCard";
export default function FavoritePage() {
  // const [products, setProducts] = useState();

  // useEffect(() => {
  //   ProductsRepo.product_favorite(favorites).then((res) => {
  //     setProducts(res);
  //   });
  // }, []);
  const products = [
    // {id : 1 , name : "i phon X" , price : 200},
    // {id : 2 , name : "i phon X" , price : 200},
    // {id : 3 , name : "i phon X" , price : 200},
  ];

  const favoriteLength = products.length === 0;

  return (
    <div className="w-full h-[calc(100vh-90px)]">
      <p className="text-center py-4 bg-black text-white font-bold ">
        قائمة المفضلة
      </p>
      <div className="container mx-auto py-5">
        {favoriteLength ? (
          <div className="text-center flex items-center justify-center flex-col">
            <p className="text-gray-400 font-bold text-3xl">لا يوجد !</p>
            <img
              src={favoriteNull}
              className=" img-fluid w-1/2 h-[350px]"
            />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((el) => (
              <ProductCard key={el.id} name={el.name} price={el.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
