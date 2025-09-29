import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-md w-64">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>가격: {product.price.toLocaleString()}원</p>
      <p>재고: {product.inStock ? "있음" : "없음"}</p>
      <p>평점: {product.rating}</p>
      <div className="flex gap-2 flex-wrap mt-2">
        {product.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-200 text-sm rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
