const INIT_STATE = {
   carts: [],
   materialId: []
}


export const cartreducer = (state = INIT_STATE, action) => {
   switch (action.type) {
      case "ADD_CART":
         return {
            ...state,
            carts: [...state.carts, action.payload]
         }

      case "ADD_MATERIAL_ID":
         return {
            ...state,
            materialId: action.payload,
            // console.log(materialId)
         }

      case "DELETE_MATERIAL_ID":
         const data = state.carts.filter((el) => el.id !== action.payload.id);

         return {
            ...state,
            carts: data
         }

      default:
         return state
   }
}