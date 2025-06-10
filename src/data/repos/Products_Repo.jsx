import { indexFavoriteProducts } from "../apis/index_favorite_product"
// import { indexModalProduct } from "../apis/index_modal_product"
// import { indexProduct } from "../apis/index_product"
// import { showProduct } from "../apis/show_Products"

export const ProductsRepo = {

    Product_show : async (id) => {
        return await showProduct(id)
    },

    Product_popular : async () => {
        return await indexModalProduct()
    },

    product_favorite : async (favoriteId) => {
        return await indexFavoriteProducts(favoriteId)
    }
}