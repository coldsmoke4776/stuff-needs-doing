
const colors = [
  'green',
  'blue',
  'yellow',
  'purple', 
  'pink', 
  'orange']

const randomColor = colors[Math.floor(Math.random() * colors.length)];

const ProgressBar = ({ progress }) => {
    return (
      <div className='outer-bar'>
        <div 
        className='inner-bar'
        style={{width: `${progress}%`, backgroundColor: randomColor }}>
          

        </div>
      </div>
    );
  }
  
  export default ProgressBar;