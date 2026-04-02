import React from 'react';

function ItemRow({ product, onDelete }) {
  const handleDelete = () => {
    onDelete(product.nome);
  };

  return (
    <tr>
      <td>{product.nome}</td>
      <td>{product.quantidade}</td>
      <td>{product.valor}</td>
      <td className="actionsColumn">
        <button type="button" className="deleteButton" onClick={handleDelete} aria-label={`Remover ${product.nome}`}>
          ×
        </button>
      </td>
    </tr>
  );
}

export default ItemRow;
