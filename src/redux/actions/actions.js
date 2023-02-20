export const ADD = (item) => {
   return {
      type: "ADD_CART",
      payload: item
   }
}


export const ID = (item) => {
   console.log(item)
   return {
      type: "ADD_MATERIAL_ID",
      payload: item
   }
}


export const DLT = (item) => {
   // console.log(item)
   return {
      type: "DELETE_MATERIAL_ID",
      payload: item
   }
}