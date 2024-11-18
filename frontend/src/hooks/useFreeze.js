import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useToast } from "@/hooks/use-toast";

const useFreeze = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const { toast } = useToast();

  const freeze = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/user/freeze", {
        method: "POST",
        credentials: "include",
      });

      toast({
        description: "Your account has been frozen.",
      });
      window.location.href = "/";
      setUser(null);
    } catch (error) {
      toast({
        description: error.message,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { freeze, isLoading };
};

export default useFreeze;
