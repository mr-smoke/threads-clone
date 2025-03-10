import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const useLogout = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });

      toast({
        description: "Logged out successfully",
        variant: "success",
      });
      window.location.href = "/";
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
