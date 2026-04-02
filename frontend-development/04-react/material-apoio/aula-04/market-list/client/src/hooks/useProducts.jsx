import { useCallback, useState } from "react";
import { getProducts, addProduct, deleteProduct } from "../services/api.jsx";

/**
 * Hook customizado para gerenciar produtos
 * Encapsula toda a lógica de estado e requisições da API
 * @returns {Object} { products, loading, loadProducts, handleAddProduct, handleDeleteProduct }
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Carrega todos os produtos da API
   */
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adiciona um novo produto
   * @param {string} inputProduct - Nome do produto
   * @param {number} inputQuantity - Quantidade
   * @param {number} inputPrice - Preço
   */
  const handleAddProduct = useCallback(
    async (inputProduct, inputQuantity, inputPrice) => {
      // Validação
      if (inputProduct === "") {
        alert("Escreva o nome de um item!");
        return;
      }

      if (isNaN(inputQuantity) || isNaN(inputPrice)) {
        alert("Quantidade e valor precisam ser números!");
        return;
      }

      try {
        const newProduct = await addProduct(
          inputProduct,
          inputQuantity,
          inputPrice,
        );
        setProducts((currentProducts) => [...currentProducts, newProduct]);
        alert("Item adicionado!");
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto");
      }
    },
    [],
  );

  /**
   * Deleta um produto
   * @param {string} productName - Nome do produto a deletar
   */
  const handleDeleteProduct = useCallback(async (productName) => {
    if (window.confirm("Você tem certeza?")) {
      try {
        await deleteProduct(productName);
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product.nome !== productName),
        );
        alert("Removido!");
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Erro ao deletar produto");
      }
    }
  }, []);

  return {
    products,
    loading,
    loadProducts,
    handleAddProduct,
    handleDeleteProduct,
  };
}
