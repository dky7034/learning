import React from "react";

export default function UserCard({ userData, onClick }) {
  // if (!userData) return null; // 안전 장치

  return (
    <div className="w-80 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={userData.profileImage}
            alt="사용자 프로필"
            onClick={() => onClick(userData.name, userData.age, userData.email)}
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {userData.name}
          </h2>
          <p className="text-gray-600 mb-1">{userData.age}세</p>
          <p className="text-blue-600 font-medium">{userData.email}</p>
        </div>
      </div>
    </div>
  );
}
