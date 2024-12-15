import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();

      if (data.error) {
        toast({
          description: data.error,
          variant: "unsuccess",
        });
      } else {
        toast({
          description: "Logged in successfully",
          variant: "success",
        });
        window.location.href = "/";
        setUser(data);
      }
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};

export default useLogin;
