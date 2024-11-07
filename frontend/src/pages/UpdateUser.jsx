import { useAuth } from "@/context/AuthContext";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useRef, useState } from "react";

const UpdateUser = () => {
  const { user } = useAuth();
  const { updateUser } = useUpdateUser();
  const [formData, setFormData] = useState({
    email: user?.email,
    name: user?.name,
    username: user?.username,
    bio: user?.bio,
  });
  const imageRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  return (
    <main className="flex flex-col items-center bg-gray-900 rounded-xl">
      <section className="flex flex-col py-4 px-6">
        <h1 className="text-3xl font-bold text-center">Update Profile</h1>
        <form
          className="flex flex-col gap-3 pt-3 w-72 sm:w-96"
          onSubmit={submitHandler}
        >
          <div className="flex justify-between gap-10 w-full">
            <img
              src="/noavatar.png"
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col justify-center flex-1 gap-1">
              <button
                className="bg-gray-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-gray-800"
                onClick={() => imageRef.current.click()}
              >
                Change Image
              </button>
              <input ref={imageRef} hidden type="file" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 rounded-lg text-black"
              type="text"
              id="email"
              placeholder={user?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="p-2 rounded-lg text-black"
              type="text"
              id="name"
              placeholder={user?.name}
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
              placeholder={user?.username}
              minLength={6}
              maxLength={25}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="bio">Biography</label>
            <textarea
              className="p-2 rounded-lg text-black"
              id="bio"
              placeholder={user?.bio}
              maxLength={100}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex justify-center gap-3">
            <a href="/">
              <button className="mt-3 bg-red-500 text-white font-semibold px-5 py-3 rounded-lg w-40 self-center hover:bg-red-600">
                Cancel
              </button>
            </a>
            <button
              className="mt-3 bg-green-500 text-white font-semibold px-5 py-3 rounded-lg w-40 self-center hover:bg-green-600"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UpdateUser;
