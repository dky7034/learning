import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/posts?limit=10");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">게시물 목록</h1>
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id} className="py-4">
            <Link
              to={`/posts/${post.id}`}
              className="text-lg text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
            >
              {post.id}. {post.title}
            </Link>
            <p className="text-gray-600 mt-1 truncate">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
