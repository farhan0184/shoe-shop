const getStoreCart = () =>{
    let shoppingCart = {}

    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }

    return shoppingCart
}

const addToDb = id =>{
    let shoppingCart = getStoreCart()

    const quantity = shoppingCart[id]
    if(quantity){
        shoppingCart[id] = quantity + 1
    }
    else{
        shoppingCart[id] = 1
    }
    localStorage.setItem('shopping-cart',JSON.stringify(shoppingCart))
}

const deleteShoppingCart = () =>{
    localStorage.removeItem('shopping-cart');
}
export{
    getStoreCart,
    addToDb,
    deleteShoppingCart
}