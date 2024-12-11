const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`flex justify-between items-center w-full px-4 py-2 font-semibold rounded-lg hover:bg-neutral-800 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
