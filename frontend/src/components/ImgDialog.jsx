import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ImgDialog = ({ img, className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={img}
          alt="Image 1"
          className={`cursor-pointer object-cover rounded-lg ${className}`}
        />
      </DialogTrigger>
      <DialogContent className="max-w-max">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <img
              src={img}
              alt="Image 1"
              className="h-full max-h-screen object-cover rounded-lg"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImgDialog;
