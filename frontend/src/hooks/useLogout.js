import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const useLogout = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      toast({
        description: "Logged out successfully",
        variant: "success",
      });
      setUser(null);
    } catch (error) {
      toast({
        description: error.message,
        variant: "unsuccess",
      });
    }
  };

  return { handleLogout };
};

export default useLogout;
