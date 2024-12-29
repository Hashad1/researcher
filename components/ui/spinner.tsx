import { ClipLoader } from 'react-spinners';

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <ClipLoader size={20} color={"#123abc"} />
  </div>
);

export default Spinner;
