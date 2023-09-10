import React, { createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            } )

            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`);
    }

      // setting local storage
  useEffect(() => {
    let string = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", string);
    localStorage.setItem("total", totalQuantities);
    localStorage.setItem("price", totalPrice);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      let finalCartItems = [
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];
      let length = finalCartItems.length;
      [finalCartItems[index], finalCartItems[length - 1]] = [
        finalCartItems[length - 1],
        finalCartItems[index],
      ];
      setCartItems(finalCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        let finalCartItems = [
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
        let length = finalCartItems.length;
        [finalCartItems[index], finalCartItems[length - 1]] = [
          finalCartItems[length - 1],
          finalCartItems[index],
        ];
        setCartItems(finalCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1 );
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }


    return (
        <Context.Provider
        value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);