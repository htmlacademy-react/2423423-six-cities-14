import './styles.css';

function Spinner() {
  return (
    <div className='wrapLoader' data-testid ='spinner'>
      <div className='spinner one'></div>
      <div className='spinner two'></div>
      <div className='spinner three'></div>
      <div className='spinner four'></div>
      <div className='spinner five'></div>
      <div className='spinner six'></div>
    </div>
  );
}

export default Spinner;
