import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FaSpinner className="animate-spin w-10 h-10" />
      <p className="text-xl">Loading...</p>
    </div>
  );
};

export default Loading;
