/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { Card, CardContent, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Modal, TextField } from '@mui/material';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({ id: '', name: '', author: '' });
   const [newBook, setNewBook] = useState({ name: '', author: '' });
   const token = localStorage.getItem('token');

      const fetchBooks = async () => {
        try {
          const response = await axios.get('https://real-tan-caterpillar-boot.cyclic.cloud/api/v1/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
            console.error("Error creating book:", error);
            Swal.fire({
              icon: "error",
              title: `Oops...`,
              html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
            });
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
      const token = localStorage.getItem('token');
  
      await axios.put(
        `https://real-tan-caterpillar-boot.cyclic.cloud/api/v1/books/${selectedBook.id}`,
        {
          name: selectedBook.name,
          author: selectedBook.author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setEditModalOpen(false);
      fetchBooks();
      Swal.fire({
        icon: 'success',
        title: 'Book Edited Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error edit book:", error);
      setEditModalOpen(false);
      Swal.fire({
        icon: "error",
        title: `Oops...`,
        html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
      });
    }
  };

  const handleDelete = async (id) => {
    try {

      await axios.delete(`https://real-tan-caterpillar-boot.cyclic.cloud/api/v1/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Book Successfully Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
        console.error("Error creating book:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
    }
  };

  const handleInputChange = (e) => {
    setSelectedBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddBook = async () => {
    try {
      await axios.post('https://real-tan-caterpillar-boot.cyclic.cloud/api/v1/books', {
        name: newBook.name, 
        author: newBook.author,  
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );


      setAddModalOpen(false);
      setNewBook({ name: '', author: '' }); 
      fetchBooks();
    } catch (error) {
        console.error("Error creating book:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful',
      showConfirmButton: false,
      timer: 1500, 
    }); 
    history.push('/LoginForm'); 
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
          Najmy's Fav Book
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)} style={{ marginBottom: '20px' }}>
  Add Book
</Button>
<Button href='/login' style={{ marginBottom: '20px' }} onClick={handleLogout}>
  Logout
</Button>
        <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
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
              Add Book
            </Typography>
            <TextField
              label="Book Name"
              name="name"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Author"
              name="author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddBook} style={{ marginTop: '10px' }}>
              Add Book
            </Button>
          </div>
        </Modal>
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

export default HomePage;
