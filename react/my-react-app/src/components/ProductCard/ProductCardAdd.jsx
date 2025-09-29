import React from "react";

export default function ProductCardAdd({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const name = fd.get("name")?.toString() ?? "";
    const price = Number(fd.get("price"));
    const description = fd.get("description")?.toString() ?? "";
    const inStock = fd.get("inStock")?.toString().toLowerCase() === "true";
    const rating = Number(fd.get("rating"));
    const tags =
      fd
        .get("tags")
        ?.toString()
        .split(",")
        .map((s) => s.trim()) ?? [];

    const imageFile = fd.get("image");
    let imageUrl = "";
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile); // 미리보기용
    }

    const newProduct = {
      name,
      price,
      description,
      inStock,
      rating,
      tags,
      image: imageUrl,
    };

    onSubmit?.(newProduct);
    e.currentTarget.reset();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="name" placeholder="제품명을 입력하세요" />
        <input type="number" name="price" placeholder="가격을 입력하세요" />
        <input type="text" name="description" placeholder="설명을 입력하세요" />
        <input
          type="text"
          name="inStock"
          placeholder="재고 유무 (true/false)"
        />
        <input type="number" name="rating" placeholder="평점을 입력하세요" />
        <input
          type="text"
          name="tags"
          placeholder="태그를 입력하세요 (쉼표로 구분)"
        />
        <input type="file" name="image" accept="image/*" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}
