import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const updateUser = async (formData, images) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, images }),
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
          description: "Profile updated successfully",
          variant: "success",
        });
        setUser(data);
        window.location.reload();
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

  return { updateUser, isLoading };
};

export default useUpdateUser;
