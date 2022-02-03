import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();
    const goToPreviousPath = () => {
        navigate(-1);
        }    

    return (
      <button className='back-button' onClick={goToPreviousPath}>
      </button>
    );
  }
  
  export default BackButton;