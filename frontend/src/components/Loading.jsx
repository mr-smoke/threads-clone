import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FaSpinner className="animate-spin w-5 h-5" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
