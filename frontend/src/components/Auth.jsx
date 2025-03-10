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
  const { user, isLoading } = useAuth();
  const { handleLogout } = useLogout();

  if (isLoading) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4">
      {!user ? (
        <a href="/login">
          <button className="bg-white text-black font-semibold h-8 px-4 rounded-lg">
            Login
          </button>
        </a>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-white text-black font-semibold h-8 px-4 rounded-lg">
              Logout
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <p className="text-2xl font-semibold">Do you want to logout?</p>
              </DialogTitle>
              <DialogDescription asChild>
                <div className="flex justify-end gap-3 pt-3">
                  <DialogClose asChild>
                    <button className="bg-neutral-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-neutral-800 w-max">
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
      )}
    </div>
  );
};

export default Auth;
