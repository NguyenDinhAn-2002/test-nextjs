"use client";

import { useState } from "react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<{ id: string; email: string }[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setError("Vui lòng nhập từ khóa tìm kiếm!");
      return;
    }
    setError("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: searchTerm }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Lỗi tìm kiếm!");

      setResults(data.users);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Tìm kiếm</h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-center mb-6"
        >
          <input
            type="text"
            placeholder="Nhập từ khóa..."
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Tìm
          </button>
        </form>

        {error && (
          <p className="error-message text-red-500 text-center">{error}</p>
        )}

        <div className="search-results mt-4">
          {results.length > 0
            ? results.map((result) => (
                <div
                  key={result.id}
                  className="result-item bg-gray-100 p-4 rounded-md shadow mb-4"
                >
                  <h2 className="text-lg font-medium text-gray-800">
                    {result.email}
                  </h2>
                </div>
              ))
            : !error && (
                <p className="text-center text-gray-500">Chưa tìm thấy người dùng!</p>
              )}
        </div>
      </div>
    </div>
  );
}
