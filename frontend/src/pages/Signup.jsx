import Loading from "@/components/Loading";
import useSignup from "@/hooks/useSignup";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    username: "",
  });
  const { handleSignup, isLoading } = useSignup();

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignup(formData);
  };

  return (
    <div className="h-full flex items-center">
      <main className="flex flex-col items-center bg-neutral-900 rounded-xl p-6 mx-auto w-max">
        <h1 className="text-3xl font-bold">Signup</h1>
        <form className="flex flex-col gap-3 pt-3" onSubmit={submitHandler}>
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
          <div className="flex gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                className="p-2 rounded-lg text-black"
                type="password"
                id="password"
                minLength={6}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                className="p-2 rounded-lg text-black"
                type="password"
                id="confirm-password"
                minLength={6}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 rounded-lg text-black"
              type="text"
              id="name"
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              className="p-2 rounded-lg text-black"
              type="text"
              id="username"
              minLength={6}
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
          <button
            className="mt-3 bg-blue-500 text-white px-5 py-3 rounded-lg w-max self-center hover:bg-blue-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "Signup"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
