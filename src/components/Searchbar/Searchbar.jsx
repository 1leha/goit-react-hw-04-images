import React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormButtonStyled,
  SearchFormButtonLabelStyled,
  SearchFormInput,
} from './Searchbar.styled';

import { BiSearch } from 'react-icons/bi';

const Searchbar = ({ onSubmit }) => {
  const handlerSubmit = values => {
    onSubmit(values);
  };

  return (
    <SearchbarStyled>
      <Formik initialValues={{ query: '' }} onSubmit={handlerSubmit}>
        {/* Parttern  "Render props" */}
        {props => {
          const searchStringIsEmpty = props.values.query === '';

          return (
            <SearchFormStyled>
              <SearchFormButtonStyled
                type="submit"
                area-label="Search button"
                disabled={searchStringIsEmpty}
              >
                <BiSearch size={20} />
                <SearchFormButtonLabelStyled>
                  Search
                </SearchFormButtonLabelStyled>
              </SearchFormButtonStyled>

              <SearchFormInput
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="query"
              />
            </SearchFormStyled>
          );
        }}
      </Formik>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
