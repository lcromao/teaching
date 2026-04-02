import React, { useState } from 'react';

function AddItemForm({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    onAddProduct(productName, quantity, price);
    
    // Limpar campos após adicionar
    setProductName('');
    setQuantity('');
    setPrice('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section className="newItem">
      <input
        type="text"
        id="newInput"
        placeholder="Adicionar novo item:"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        id="newQuantity"
        placeholder="Quantidade:"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        id="newPrice"
        placeholder="Valor:"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSubmit} className="addBtn">
        Adicionar
      </button>
    </section>
  );
}

export default AddItemForm;
