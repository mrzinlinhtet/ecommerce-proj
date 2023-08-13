import { useNavigate } from 'react-router-dom'
const Success = () => {
     const navigate = useNavigate();

  return (
    <div className="flex justify-center animate__animated animate__backInDown">
      <div className="bg-secondary p-20 rounded shadow-lg mt-20">
        <h1 className="text-4xl font-semibold tracking-wider my-5 text-primary">
          Thanks For Purchasing
        </h1>
        <button onClick={() => navigate('/')} className="text-primary bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105">
          go shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
