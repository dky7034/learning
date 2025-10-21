import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const { postId } = useParams(); // URL 파라미터에서 postId를 가져옵니다.
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/posts/${postId}`
        );
        setPost(response.data);
        setError(null);
      } catch (err) {
        setError("게시물을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]); // postId가 변경될 때마다 데이터를 다시 가져옵니다.

  if (loading) {
    return <div className="text-center mt-10">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-10">게시물이 없습니다.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">게시물 ID: {post.id}</div>
      <p className="text-gray-700 leading-relaxed">{post.body}</p>
      <div className="mt-8 pt-6 border-t">
        <Link
          to="/posts"
          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          &larr; 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
