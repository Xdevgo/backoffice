export const initialState = {
        basket: [],
        user: null,
        shipping: []
}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    ADD_SHIPPING: "ADD_SHIP"
}


export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.precio + amount, 0);

export const validarexistencia = (basket,id) =>{
    var result = [];
    basket.forEach((repuesto, index) => repuesto.id === id ? result.push(index) : null)
}





const reducer =  (state, action) => {
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem => basketItem.id === action.id))
            let newBasket = [...state.basket];
            if(index >= 0){
                newBasket.splice(index,1)
            }else {console.log("Cant remove product")}
            return {
                ...state,
                basket: newBasket,
            };
            case "SET_USER":
                return {
                    ...state,
                    user: action.user
                }
            case "EMPTY_BASKET":
                return {
                    ...state,
                    basket: action.basket
                }
            case "ADD_SHIPPING":
                return {
                    ...state,
                    shipping: action.shipping
                }
            default: return state;
      }
}

export default reducer;