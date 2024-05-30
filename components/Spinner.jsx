'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const cssStyle = {
  display: 'block',
  margin: '80px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color='#3b82f6'
      loading={loading}
      cssOverride={cssStyle}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};
export default Spinner;