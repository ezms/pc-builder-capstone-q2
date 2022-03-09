import api from "../../services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken")) || ""
  );

  const [checkoutAuth, setCheckoutAuth] = useState(false);

  const history = useHistory();

  const signIn = (data) => {
    const localStorageProducts = localStorage.getItem("build");
    api
      .post("/user/login", data)
      .then((response) => {
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.access_token)
        );
        let decoded = jwt_decode(response.data.access_token)
        setToken(response.data.access_token);
        localStorage.setItem("userID", JSON.stringify(decoded.sub.user_id));
        localStorageProducts ? history.push("/build") : history.push("/");
        toast.success(`Bem vindo ${response.data.name}!`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signUp = (data) => {
    api
      .post("/user/register", data)
      .then((response) => {
        localStorage.setItem("userID", JSON.stringify(response.data.user_id));
        toast.success(`${response.data.name} bem vindo! Faça seu login para acessar o site!`);
      })
      .catch(() => toast.error("Ops, algo deu errado!"));
  };

  const signOut = () => {
    localStorage.clear();
    setToken("");
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        checkoutAuth,
        setCheckoutAuth,
        setToken,
        signIn,
        signUp,
        signOut,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
