import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import useChangePassword from "@/hooks/useChangePassword";
import Loading from "@/components/Loading";

const ChangePassword = () => {
  const { changePassword, isLoading } = useChangePassword();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await changePassword(formData);
    if (res) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <button className="bg-neutral-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-neutral-800 w-full self-center">
          Change Password
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl font-bold pb-2">Change Password</p>
          </DialogTitle>
          <DialogDescription asChild>
            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
              <input
                className="border rounded-lg p-2 text-base text-black"
                type="password"
                placeholder="Current Password"
                minLength={6}
                maxLength={25}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPassword: e.target.value,
                  })
                }
              />
              <input
                className="border rounded-lg p-2 text-base text-black"
                type="password"
                placeholder="New Password"
                minLength={6}
                maxLength={25}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />
              <input
                className="border rounded-lg p-2 text-base text-black"
                type="password"
                placeholder="Confirm Password"
                minLength={6}
                maxLength={25}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button
                className="bg-blue-500 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-600 w-max self-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "Change Password"}
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
