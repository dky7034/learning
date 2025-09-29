import React, { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    inStock: "",
    rating: "",
    tags: "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      ...form,
      price: Number(form.price),
      inStock: form.inStock.toLowerCase() === "true",
      rating: Number(form.rating),
      tags: form.tags.split(",").map((t) => t.trim()),
      image: form.image || "https://picsum.photos/300/200", // 기본 이미지
    };

    onAdd(newProduct);
    setForm({
      name: "",
      price: "",
      description: "",
      inStock: "",
      rating: "",
      tags: "",
      image: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="제품명"
        className="border p-2 w-full"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="가격"
        className="border p-2 w-full"
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="설명"
        className="border p-2 w-full"
      />
      <input
        name="inStock"
        value={form.inStock}
        onChange={handleChange}
        placeholder="재고 (true/false)"
        className="border p-2 w-full"
      />
      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="평점"
        className="border p-2 w-full"
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="태그 (,로 구분)"
        className="border p-2 w-full"
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="이미지 URL"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        추가
      </button>
    </form>
  );
}
