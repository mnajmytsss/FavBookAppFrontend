/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Modal, TextField } from '@mui/material';

const BookContainer = () => {
  const [books, setBooks] = useState([]);
const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({ id: '', name: '', author: '' });

      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:4321/api/v1/books');
                    const booksData = response.data.data;
      
          if (Array.isArray(booksData)) {
            const formattedBooks = booksData.map(book => ({
              id: book.id || book._id,
              name: book.name,
              author: book.author,
            }));
                  setBooks(formattedBooks);
          } else {
            console.error('Error: API response does not contain an array of books', response);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
useEffect(() => {
    fetchBooks();
  }, []); 

  const handleEdit = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    setSelectedBook(bookToEdit);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:4321/api/v1/books/${selectedBook.id}`, {
        name: selectedBook.name,
        author: selectedBook.author,
      });

      setEditModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await axios.delete(`http://localhost:4321/api/v1/books/${id}`);

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
          Najmy's Fav Book
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(book.id)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(book.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={editModalOpen} onClose={handleEditModalClose}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography variant="h6" style={{ marginBottom: '20px', color: 'black' }}>
              Edit Modal
            </Typography>
            <TextField
              label="Book Name"
              name="name"
              value={selectedBook.name}
              onChange={handleInputChange}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Author"
              name="author"
              value={selectedBook.author}
              onChange={handleInputChange}
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleEditSubmit} style={{ marginTop: '10px' }}>
              Save Changes
            </Button>
          </div>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default BookContainer;
