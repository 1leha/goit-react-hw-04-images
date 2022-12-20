import React from 'react';
import Modal from '../Modal';
import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Modal>
      <MutatingDots
        height="100"
        width="100"
        color="#fff"
        secondaryColor="#fff"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Modal>
  );
};

export default Loader;
