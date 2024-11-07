import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const useGetProfile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/profile/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setProfile(data);

        if (data.error) {
          toast({
            description: data.error,
          });
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

    fetchProfile();
  }, []);

  return { profile, isLoading };
};

export default useGetProfile;
