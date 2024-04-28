/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridRowParams,
  GridColDef,
  GridSortItem,
} from '@mui/x-data-grid';
import ImageModal from './ImageModal';
import './styles.css';

interface Book {
  id: string;
  title: string;
  authors: string;
  publishedDate: string;
  description: string;
  image: string;
}

const DataTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [sortModel, setSortModel] = useState<GridSortItem[]>([]);

  useEffect(() => {
    const storedBooks: any = localStorage.getItem('books');
    const storedSortModel: any = localStorage.getItem('sortModel');
    const resSort = JSON.parse(storedSortModel);
    const resBooks = JSON.parse(storedBooks);

    if (resBooks?.length) {
      setBooks(JSON.parse(storedBooks));
      setSortModel(resSort);
    } else {
      fetchBooks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('sortModel', JSON.stringify(sortModel));
  }, [sortModel]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=react'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      const formattedBooks: Book[] = data.items.map(
        (item: any, index: number) => ({
          id: index.toString(),
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors.join(', '),
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          image: item.volumeInfo.imageLinks.thumbnail,
        })
      );

      setBooks(formattedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, sortable: true },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      sortable: true,
      filterable: true,
      cellClassName: 'title-cell',
    },
    {
      field: 'authors',
      headerName: 'Authors',
      width: 200,
      sortable: true,
      filterable: true,
      cellClassName: 'authors-cell',
    },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      width: 150,
      sortable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      sortable: true,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt='Book Cover'
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const clickedBook = books.find((book) => book.id === params.row.id);
    if (clickedBook) {
      setOpenModal(true);
      setSelectedBook(clickedBook);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={books}
        columns={columns}
        autoHeight
        pageSizeOptions={[10, 100, { value: 1000, label: '1,000' }]}
        onRowClick={handleRowClick}
        sortModel={sortModel}
        disableRowSelectionOnClick
        onSortModelChange={(model) => setSortModel(model)}
      />
      <ImageModal
        open={openModal}
        handleClose={handleCloseModal}
        book={selectedBook}
      />
    </div>
  );
};

export default DataTable;
