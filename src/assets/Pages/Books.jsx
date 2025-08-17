import React, { useEffect, useState } from "react";
import {
  fetchBooksApi,
  addBookApi,
  updateBookApi,
  deleteBookApi,
} from "../../apis/booksApi"; // adjust path if needed

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    published_date: "",
    page_count: 0,
    language: "",
  });
  const [editBook, setEditBook] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const data = await fetchBooksApi();
      setBooks(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Create book
  const addBook = async (e) => {
    e.preventDefault();
    try {
      await addBookApi(newBook);
      setShowAddModal(false);
      resetNewBook();
      fetchBooks();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Update book
  const updateBook = async (e) => {
    e.preventDefault();
    if (!editBook) return;
    try {
      await updateBookApi(editBook.uid, editBook);
      setShowEditModal(false);
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      await deleteBookApi(id);
      fetchBooks();
    } catch (error) {
      console.error(error.message);
    }
  };

  const resetNewBook = () => {
    setNewBook({
      title: "",
      author: "",
      publisher: "",
      published_date: "",
      page_count: 0,
      language: "",
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <button onClick={() => setShowAddModal(true)}>➕ Add Book</button>

      <ul>
        {books.map((b) => (
          <li key={b.uid}>
            {b.title} by {b.author}
            <button
              onClick={() => {
                setEditBook(b);
                setShowEditModal(true);
              }}
            >
              ✏️ Update
            </button>
            <button onClick={() => deleteBook(b.uid)}>🗑 Delete</button>
          </li>
        ))}
      </ul>

      {/* ✅ Add Book Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Book</h3>
            <form onSubmit={addBook}>
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Publisher"
                value={newBook.publisher}
                onChange={(e) =>
                  setNewBook({ ...newBook, publisher: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Published Date"
                value={newBook.published_date}
                onChange={(e) =>
                  setNewBook({ ...newBook, published_date: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Page Count"
                value={newBook.page_count}
                onChange={(e) =>
                  setNewBook({
                    ...newBook,
                    page_count: Number(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Language"
                value={newBook.language}
                onChange={(e) =>
                  setNewBook({ ...newBook, language: e.target.value })
                }
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Edit Book Modal */}
      {showEditModal && editBook && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Book</h3>
            <form onSubmit={updateBook}>
              <input
                type="text"
                placeholder="Title"
                value={editBook.title}
                onChange={(e) =>
                  setEditBook({ ...editBook, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={editBook.author}
                onChange={(e) =>
                  setEditBook({ ...editBook, author: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Publisher"
                value={editBook.publisher}
                onChange={(e) =>
                  setEditBook({ ...editBook, publisher: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Page Count"
                value={editBook.page_count}
                onChange={(e) =>
                  setEditBook({
                    ...editBook,
                    page_count: Number(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Language"
                value={editBook.language}
                onChange={(e) =>
                  setEditBook({ ...editBook, language: e.target.value })
                }
              />
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>{`
        .modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          max-width: 90%;
        }
        .modal-content input {
          display: block;
          width: 100%;
          margin: 8px 0;
          padding: 6px;
        }
        .modal-content button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default Books;
