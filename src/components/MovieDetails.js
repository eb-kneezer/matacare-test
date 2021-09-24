import axios from 'axios';
import { useEffect, useState } from 'react';
import './moviedetails.css';
import sort from '../assets/sort.png';
import Loading from './Loading';

export const MovieDetails = ({ selectedMovie }) => {
  const [characters, setCharacters] = useState(null);
  const [sortParam, setSortParam] = useState(null);
  const [filterGender, setFilterGender] = useState('all');
  // let gender;

  useEffect(() => {
    axios
      .all(selectedMovie.characters.map(url => axios.get(url)))
      .then(response => setCharacters(response));
  }, [selectedMovie.characters]);

  const cmToInches = cm => {
    const feet = Math.floor(cm / 30.48);
    const inches = ((cm % 30.48) / 30.48) * 12;

    return `${feet}ft/${inches.toFixed(2)}in`;
  };

  const handleSort = param => {
    if (!sortParam) {
      setSortParam({ param, order: true });
    } else if (sortParam.param === param) {
      setSortParam({ param, order: !sortParam.order });
    } else {
      setSortParam({ param, order: true });
    }
  };

  if (sortParam?.param === 'height') {
    characters.sort((a, b) => {
      if (sortParam.order) {
        return a.data[sortParam.param] - b.data[sortParam.param];
      } else {
        return b.data[sortParam.param] - a.data[sortParam.param];
      }
    });
  } else if (sortParam && characters && sortParam.param !== 'height') {
    characters.sort((a, b) => {
      if (sortParam?.order) {
        return a.data[sortParam.param] < b.data[sortParam.param] ? -1 : 1;
      } else {
        return b.data[sortParam.param] < a.data[sortParam.param] ? -1 : 1;
      }
    });
  }

  let filteredCharacters =
    characters?.length &&
    characters.filter(char => {
      if (filterGender === 'all') {
        return true;
      } else {
        return char.data.gender === filterGender;
      }
    });

  let totalHeight = 0;
  if (characters) {
    totalHeight = filteredCharacters.reduce(
      (acc, character) => acc + parseInt(character.data.height),
      0
    );
  }

  return (
    <div className='movie_container'>
      <div className='movie_title'>
        <h1>{selectedMovie.title}</h1>
        <p>Director: {selectedMovie.director}</p>
      </div>
      <div className='movie_crawl'>
        <p>{selectedMovie.opening_crawl}</p>
      </div>
      <div className='movie_characters'>
        <h3>CHARACTERS</h3>
        <select
          style={{ float: 'right', marginBottom: '5px' }}
          value={filterGender}
          onChange={e => setFilterGender(e.target.value)}>
          <option value='all'>All</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        {characters ? (
          <table>
            <thead>
              <tr>
                <th>
                  <span onClick={() => handleSort('name')}>
                    NAME{' '}
                    <img
                      className={`${sortParam?.param === 'name' ? 'show' : ''}`}
                      src={sort}
                      alt='sort'
                    />
                  </span>
                </th>
                <th>
                  {' '}
                  <span onClick={() => handleSort('gender')}>
                    GENDER{' '}
                    <img
                      className={`${
                        sortParam?.param === 'gender' ? 'show' : ''
                      }`}
                      src={sort}
                      alt='sort'
                    />
                  </span>
                </th>
                <th>
                  {' '}
                  <span onClick={() => handleSort('height')}>
                    HEIGHT{' '}
                    <img
                      className={`${
                        sortParam?.param === 'height' ? 'show' : ''
                      }`}
                      src={sort}
                      alt='sort'
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {characters &&
                filteredCharacters.map((person, index) => {
                  const { name, gender, height } = person.data;
                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>
                        {gender === 'male'
                          ? 'M'
                          : gender === 'female'
                          ? 'F'
                          : 'N/A'}
                      </td>
                      <td>{height}</td>
                    </tr>
                  );
                })}
              {characters && (
                <tr>
                  <td colSpan='2'>
                    {filteredCharacters.length}{' '}
                    {filterGender === 'male'
                      ? 'Male'
                      : filterGender === 'female'
                      ? 'Female'
                      : ''}{' '}
                    Characters in '{selectedMovie.title}'
                  </td>
                  <td>{`${totalHeight}cm (${cmToInches(totalHeight)})`}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
