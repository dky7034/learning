import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

export default function ProductContainer() {
  const [products, setProducts] = useState([
    {
      name: "무선 이어폰",
      price: 89000,
      description: "고음질 무선 이어폰",
      inStock: true,
      rating: 4.5,
      tags: ["전자제품", "오디오", "무선"],
      image: "https://picsum.photos/id/96/300/200",
    },
  ]);

  function handleAdd(product) {
    setProducts((prev) => [...prev, product]);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">상품 목록</h1>

      {/* 상품 추가 폼 */}
      <ProductForm onAdd={handleAdd} />

      {/* 상품 카드 리스트 */}
      <div className="flex flex-wrap gap-4 justify-center">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
