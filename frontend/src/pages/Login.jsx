import { useState } from "react";
import useLogin from "@/hooks/useLogin";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleLogin } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password);
  };

  return (
    <div className="h-full flex items-center">
      <main className="flex flex-col items-center bg-gray-900 rounded-xl p-6 mx-auto w-max">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          className="flex flex-col gap-3 pt-3 w-72 sm:w-96"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 rounded-lg text-black"
              type="email"
              id="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              className="p-2 rounded-lg text-black"
              type="password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
              Signup
            </a>
          </p>
          <button
            className="mt-3 bg-blue-500 text-white px-5 py-3 rounded-lg w-max self-center hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
