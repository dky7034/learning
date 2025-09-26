import React from "react";

export default function UserCard() {
  const userData = {
    name: "김철수",
    age: 28,
    email: "kimcs@example.com",
    profileImage: "https://picsum.photos/id/237/200/300",
  };
  return (
    <>
      <div className="w-80 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <img src={userData.profileImage} alt={"사용자 프로필"} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {userData["name"]}
            </h2>
            <p className="text-gray-600 mb-1">{userData["age"]}</p>
            <p className="text-blue-600 font-medium">{userData["email"]}</p>
          </div>
        </div>
      </div>
    </>
  );
}
