import api from "../../services/api";
import { createContext, useContext, useState } from "react";
import { useAuth } from "../auth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { token } = useAuth();

  const clearCart = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let timer = 100;
    const awaitClear = Promise.all(
      cart.map(
        (item) =>
          new Promise((res) =>
            setTimeout(() => {
              api.delete(`/cart/${item.product_id}`, { headers: headers });
              res(true);
            }, (timer += 300))
          )
      )
    );
    toast.promise(awaitClear, {
      pending: "Removendo todos os produtos...",
      success: {
        render({ data }) {
          setCart([]);
          return `Produtos removidos com sucesso`;
        },
      },
      error: "Oops, ocorreu um erro ao remover todos os produtos",
    });
  };

  return (
    <CartContext.Provider value={{ cart, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
