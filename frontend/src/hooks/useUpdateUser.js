import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const updateUser = async (formData, image) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, image }),
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.error) {
        toast({
          description: data.error,
        });
      } else {
        toast({
          description: "Profile updated successfully",
        });
        setUser(data);
        window.location.reload();
      }
    } catch (error) {
      toast({
        description: error.message,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
};

export default useUpdateUser;
