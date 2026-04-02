import React from "react";
import ItemRow from "./ItemRow.jsx";

function ItemList({ products, onDeleteProduct }) {
  return (
    <section className="items">
      <table id="myTable">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th className="actionsColumn">
              <img
                className="deleteHeaderIcon"
                src="https://cdn-icons-png.flaticon.com/512/126/126468.png"
                width="16"
                height="16"
                alt="delete"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ItemRow key={index} product={product} onDelete={onDeleteProduct} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ItemList;
