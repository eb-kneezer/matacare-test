import './loading.css';
import star from '../assets/death-star.svg';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={star} alt='' />
    </div>
  );
};

export default Loading;
