import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dropdown } from './components/Dropdown';
import { MovieDetails } from './components/MovieDetails';
import darth from './assets/darth-vader.svg';
import './App.css';

export const useFetch = url => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(res => {
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        setLoading(false);
        console.log(error);
        setError('error');
      });
  }, [error, url]);

  return { data, isLoading, error };
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className='App'>
      <div className='logo'></div>
      <Dropdown
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
      {selectedMovie ? (
        <MovieDetails selectedMovie={selectedMovie} />
      ) : (
        <div className='no_movie'>
          <img src={darth} alt='' />
        </div>
      )}
    </div>
  );
}
