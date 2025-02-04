import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const changePassword = async (formData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/changePassword/${user._id}`, {
        method: "PUT",
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
        return false;
      } else {
        toast({
          description: "Password updated successfully",
          variant: "success",
        });
        setUser(data);
        return true;
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

  return { changePassword, isLoading };
};

export default useUpdateUser;
