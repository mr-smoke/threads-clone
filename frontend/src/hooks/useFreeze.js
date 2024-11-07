import { data } from "autoprefixer";
import { useAuth } from "../context/authContext";
import { useToast } from "@/hooks/use-toast";

const useFreeze = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();

  const freeze = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/freeze", {
        method: "POST",
        credentials: "include",
      });

      toast({
        description: "Your account has been frozen.",
      });
      setUser(null);
    } catch (error) {
      toast({
        description: error.message,
      });
      console.error(error);
    }
  };

  return { freeze };
};

export default useFreeze;
