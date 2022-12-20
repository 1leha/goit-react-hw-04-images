import Modal from '../Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ImageGalleryItemStyled,
  ImageGalleryItemImageStyled,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImageURL, fullSizedImageURL, tags }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(openModal => (openModal = !openModal));
  };

  return (
    <>
      <ImageGalleryItemStyled onClick={toggleModal}>
        <ImageGalleryItemImageStyled
          src={smallImageURL}
          alt={tags}
          loading="lasy"
        />
      </ImageGalleryItemStyled>

      {openModal && (
        <Modal toggleModal={toggleModal}>
          <img src={fullSizedImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallImageURL: PropTypes.string.isRequired,
  fullSizedImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
