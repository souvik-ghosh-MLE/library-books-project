const API_BASE_URL = "http://localhost:8000/api/v1/books";

const getToken = () => localStorage.getItem("access_token");

// Fetch all books
export const fetchBooksApi = async () => {
  const res = await fetch(API_BASE_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

// Create book
export const addBookApi = async (book) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
};

// Update book
export const updateBookApi = async (uid, book) => {
  const res = await fetch(`${API_BASE_URL}/${uid}`, {
    method: "PATCH", // or PUT depending on your backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
};

// Delete book
export const deleteBookApi = async (uid) => {
  const res = await fetch(`${API_BASE_URL}/${uid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
};
