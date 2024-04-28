import React from 'react';
import { Modal, Paper, Typography } from '@mui/material';
import './styles.css';

interface ImageModalProps {
  open: boolean;
  handleClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, handleClose, book }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper className='modalPaper'>
        <div className='content'>
          {book && (
            <>
              <img src={book.image} alt={book.title} className='image' />
              <Typography variant='h6'>{book.title}</Typography>
              <Typography variant='subtitle1'>
                Authors: {book.authors}
              </Typography>
              <Typography variant='subtitle1'>
                Published Date: {book.publishedDate}
              </Typography>
              <Typography variant='body1'>{book.description}</Typography>
            </>
          )}
        </div>
      </Paper>
    </Modal>
  );
};

export default ImageModal;
