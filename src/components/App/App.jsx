// Libs
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Options
import {
  mashineStatus,
  GALLERY_SCROLL_TIMEOUT,
  pixabayOptions,
} from '../../services/options';

// Services
import { fetchData } from '../../services';
import { message } from '../../services/messages';

// Components
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from 'components/Loader';
import IdleScreen from '../IdleScreen';
import Button from '../Button';

// Styled Components
import GlobalStyle from '../GlobalStyle';
import AppStyled from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [firstImgUrlInFetch, setFirstImgUrlInFetch] = useState('');
  const [status, setStatus] = useState(mashineStatus.IDLE);
  const [error, setError] = useState('');
  const [loadMoreBtnVisibility, setLoadMoreBtnVisibility] = useState(false);

  const handleSerch = ({ query }) => {
    setQuery(query);
  };

  const scrollNextPage = firstImgUrlInFetch => {
    setTimeout(() => {
      const firstImg = document.querySelector(
        `img[src="${firstImgUrlInFetch}"]`
      );

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: firstImg.offsetTop - 84,
      });
    }, GALLERY_SCROLL_TIMEOUT);
  };

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const getImages = async (query, page) => {
    // const { page, query } = this.state;

    setStatus(mashineStatus.LOADING);

    try {
      const data = await fetchData(query, page);
      const hits = await data.hits;
      const imagesInFetch = hits.length;

      // NoImages found check
      if (!imagesInFetch) {
        toast.info(`No images found!`);

        setStatus(mashineStatus.SUCCESSFULLY);
        setLoadMoreBtnVisibility(false);
        return;
      }

      // Get url for the first image of new page
      const url = await hits[0].webformatURL;

      // Calculating Total images found and left images in base
      const imagesPerPage = pixabayOptions.per_page;
      const totalImages = data.totalHits;

      const imagesLeft =
        imagesInFetch === imagesPerPage
          ? totalImages - imagesPerPage * page
          : 0;

      // Making a Toast :)
      toast.info(`Total found: ${totalImages}. Images left: ${imagesLeft}.`);

      setSearchData(prevSearchData => [...prevSearchData, ...hits]);
      setFirstImgUrlInFetch(url);
      setStatus(mashineStatus.SUCCESSFULLY);
      setLoadMoreBtnVisibility(imagesInFetch >= imagesPerPage ? true : false);
    } catch ({ code, message }) {
      toast.error(`${code}: ${message}`);

      setError(`${code}: ${message}`);
      setStatus(mashineStatus.SUCCESSFULLY);
      // console.log('error :>> ', error);
    }
  };

  // New query Effect
  useEffect(() => {
    setSearchData([]);
    setPage(1);
  }, [query]);

  // Change query or page Effect
  useEffect(() => {
    if (!query) {
      return;
    }

    getImages(query, page);
  }, [query, page]);

  // Scroll next nage Effect
  useEffect(() => {
    if (!firstImgUrlInFetch) {
      return;
    }

    scrollNextPage(firstImgUrlInFetch);
  }, [firstImgUrlInFetch]);

  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <Searchbar onSubmit={handleSerch} />

        <ImageGallery searchData={searchData} />

        {status === mashineStatus.IDLE && (
          <IdleScreen>{message.IDLE}</IdleScreen>
        )}

        {status === mashineStatus.LOADING && <Loader />}

        {/* Place for render ERROR container if it need */}
        {/* {status === mashineStatus.ERROR && <Modal>{error}</Modal>} */}

        {status === mashineStatus.SUCCESSFULLY && loadMoreBtnVisibility && (
          <Button onClick={nextPage} />
        )}

        <ToastContainer />
      </AppStyled>
    </>
  );
};

App.propTypes = {
  searchString: PropTypes.string,
};
