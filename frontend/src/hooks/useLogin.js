const useLogin = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { handleLogin };
};

export default useLogin;
