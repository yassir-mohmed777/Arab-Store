import { indexCategorice } from "../apis/indexCategorice"

export const CatsRepo = {
    index_categorice : async() => {
        return await indexCategorice()
    },

    // categorice_show : async(id ) => {
    //     return await showCategorice(id )
    // }
}