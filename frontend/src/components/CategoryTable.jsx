import React from "react";

export default function CategoryTable({ products }) {
  if (!products || products.length === 0) {
    return <p>No products loaded yet.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.vintedId}>
            <td>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.title}
              </a>
            </td>
            <td>{p.price}</td>
            <td>{p.brand}</td>
            <td>{p.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
