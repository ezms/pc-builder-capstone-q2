import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Container } from "./styles";
import api from "../../services/api.js";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Header from "../../components/Header";
import { useModal } from "../../providers/modal";
import Modal from "../../components/Modal";
import ModalDetails from "../../components/ModalDetails";
import { toast } from "react-toastify";

const Products = () => {
  const history = useHistory();

  const { isOpen, handleOpenModal } = useModal();

  const [products, setProducts] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [category, setCategory] = useState(0);

  const [categories, setCategories] = useState([]);

  const [everyProduct, setEveryProduct] = useState([]);

  useEffect(() => {
    if (searchInput) {
      let filtered = products.filter((item) =>
        item.model.toLowerCase().includes(searchInput.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(everyProduct);
    }
  }, [searchInput]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setEveryProduct(response.data);
      })
      .catch(() => toast.error("Ops, houve um erro ao carregar produtos!"));
  }, []);

  useEffect(() => {
    api
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) =>
        toast.error("Ops, houve um erro ao carregar categorias!")
      );
  }, []);

  useEffect(() => {
    if (!category) {
      setProducts(everyProduct);
    } else {
      api
        .get(`/categories/${category}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) =>
          toast.error(
            "Ops, houve um erro ao carregar os produtos da categoria!"
          )
        );
    }
  }, [category]);

  const addToCart = (item) => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    if (token) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      api
        .post(`/cart/${item.product_id}`, "", {
          headers: headers,
        })
        .then(() => {
          toast.success(`${item.model} foi adicionado ao carrinho!`);
        })
        .catch((err) => {
          toast.error("Ops, algo deu errado!");
        });
    } else {
      toast.info("Efetue login para adicionar produtos no carrinho!");
      history.push("/sign");
    }
  };

  return (
    <>
      <Header
        buttonOut1="Login"
        buttonOut2="Registro"
        buttonIn1="Monte seu PC"
        buttonIn2="Logout"
      />
      {isOpen && (
        <Modal>
          <ModalDetails />
        </Modal>
      )}
      <Container>
        <div id="homeCover">
          {/* <button onClick={() => history.push("/build")}>Monte seu PC</button> */}
        </div>
        <div id="banner">
          <h3>PRODUTOS</h3>
        </div>

        <div id="filters">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Pesquisar"
          />

          <select
            onChange={(event) => setCategory(event.target.value)}
            name="category"
            id="categories"
          >
            <option value="">Todos</option>
            {categories.map((item, index) => {
              return (
                <option key={index} value={item.category_id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div id="products">
          {products.length > 0 ? (
            products.map((element, index) => (
              <div id="card" key={index}>
                <div id="imageDiv">
                  <img src={element.img} alt={element.model} />
                </div>
                <div id="contentDiv">
                  <div id="info">
                    <h3>{element.model}</h3>
                    <p onClick={() => handleOpenModal(element)}>
                      Exibir detalhes <AiOutlinePlusCircle id="plusIcon" />
                    </p>
                    <h3>
                      {element.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(element);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))
          ) : !products.length && searchInput.length > 0 ? (
            <div id="empty">
              <h3>Nenhum produto encontrado...</h3>
            </div>
          ) : (
            <div id="empty">
              <h3>Carregando produtos...</h3>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Products;
