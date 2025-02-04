import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const { toast } = useToast();

  const handleSignup = async (formData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          description: "Signed up successfully",
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

  return { handleSignup, isLoading };
};

export default useSignup;
