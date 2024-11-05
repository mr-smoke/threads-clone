import useLogin from "@/hooks/useLogin";

const Login = () => {
  const { handleLogin } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin("johndoe@email.com", "johndoe");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={submitHandler}
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
