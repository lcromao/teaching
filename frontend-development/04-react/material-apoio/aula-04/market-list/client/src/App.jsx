import React, { useEffect } from "react";
import Header from "./components/Header.jsx";
import AddItemForm from "./components/AddItemForm.jsx";
import ItemList from "./components/ItemList.jsx";
import { useProducts } from "./hooks/useProducts.jsx";

function App() {
  const {
    products,
    loading,
    loadProducts,
    handleAddProduct,
    handleDeleteProduct,
  } = useProducts();

  // Hook para carregar lista de produtos ao montar o componente
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <Header />
      <AddItemForm onAddProduct={handleAddProduct} />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ItemList products={products} onDeleteProduct={handleDeleteProduct} />
      )}
    </>
  );
}

export default App;
