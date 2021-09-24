import React from 'react';
import { useFetch } from '../App';
import './dropdown.css';
import dropArrow from '../assets/angle-arrow-down.png';
import Loading from './Loading';

export const Dropdown = ({
  isOpen,
  setIsOpen,
  selectedMovie,
  setSelectedMovie,
}) => {
  const { data, isLoading } = useFetch('https://swapi.dev/api/films');

  const handleDropdown = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleSelectMovie = film => {
    setSelectedMovie(film);
    setIsOpen(false);
  };

  const sortMoviesByReleaseDate = films => {
    return films.sort((a, b) => {
      let aDate = a.release_date.split('-')[0];
      let bDate = b.release_date.split('-')[0];
      if (parseInt(bDate) > parseInt(aDate)) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  return (
    <div className='dropdown_container'>
      <div className='dropdown_selector'>
        <div className='dropdown_selected'>
          <p>{selectedMovie ? selectedMovie.title : 'select a film'}</p>
        </div>
        <div className='dropdown_arrow' onClick={handleDropdown}>
          <span>
            <img
              className={`${isOpen ? 'up' : 'down'}`}
              src={dropArrow}
              alt='drop'
            />
          </span>
        </div>
      </div>
      <div className={`dropdown_list ${isOpen ? 'open' : ''}`}>
        {isLoading && <Loading />}
        {data ? (
          sortMoviesByReleaseDate(data.results).map(film => (
            <div
              key={film.title}
              onClick={() => handleSelectMovie(film)}
              className='dropdown_content'>
              <p>{film.title}</p>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
