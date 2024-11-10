import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import useLogout from "@/hooks/useLogout";

const Auth = () => {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <div className="absolute top-4 right-4">
      {!user && (
        <a href="/login">
          <button className="bg-white text-black font-semibold h-8 px-4 rounded-lg">
            Login
          </button>
        </a>
      )}
      <Dialog>
        <DialogTrigger>
          {user && (
            <button className="bg-white text-black font-semibold h-8 px-4 rounded-lg">
              Logout
            </button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl font-semibold">Do you want to logout?</h1>
            </DialogTitle>
            <DialogDescription>
              <div className="flex justify-between">
                <DialogClose asChild>
                  <button className="bg-gray-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-gray-800 w-max">
                    Cancel
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-600 w-max"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
