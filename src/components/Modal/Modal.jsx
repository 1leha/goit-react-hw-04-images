import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ toggleModal, children }) => {
  const closeModal = e => {
    if (toggleModal === undefined) {
      return;
    }

    if (e.code === 'Escape' || e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  return createPortal(
    <OverlayStyled onClick={closeModal}>
      <ModalStyled>{children}</ModalStyled>
    </OverlayStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
