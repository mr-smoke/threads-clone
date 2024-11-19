import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FaSpinner className="animate-spin w-6 h-6" />
      <p className="text-lg">Loading...</p>
    </div>
  );
};

export default Loading;
