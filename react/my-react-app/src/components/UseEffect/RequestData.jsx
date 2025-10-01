import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import "./RequestData.css";

// 컴포넌트가 첫 마운트될 때 DummyJSON으로 데이터를 요청(axios)
export default function RequestData() {
  const [products, setProducts] = useState([]);

  // 빈 의존성 배열: 컴포넌트가 처음 마운트될 때 콜백 함수를 실행
  useEffect(() => {
    // 즉시 실행 함수 표현식(IIFE)을 사용하여 간결하게 작성
    (async () => {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    })();
  }, []);

  return (
    <div className="products-container">
      <h1 className="products-title">상품 목록</h1>
      <div className="products-grid">
        {products.map((product) => {
          // 매개변수 product를 Product 컴포넌트에 Props로 전달
          // 속성명: product / 값: 매개변수 product
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
