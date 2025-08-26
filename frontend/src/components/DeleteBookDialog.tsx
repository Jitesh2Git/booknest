import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBook } from "@/lib/actions";
import { useNavigate } from "react-router-dom";

const DeleteBookDialog = ({ bookId }: { bookId: string }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const favs = JSON.parse(localStorage.getItem("favourites") || "[]") as {
        id: string;
      }[];
      const updatedFavs = favs.filter((b) => b.id !== bookId);
      if (updatedFavs.length !== favs.length) {
        localStorage.setItem("favourites", JSON.stringify(updatedFavs));
      }

      const res = await deleteBook(bookId);

      if (res.ok) {
        toast.success(res.message || "Book deleted successfully", {
          style: {
            color: "var(--custom-dark-200)",
            backgroundColor: "var(--custom-green-500)",
          },
        });
        setOpen(false);
        navigate("/");
      } else {
        toast.error("Failed to delete book", {
          style: {
            color: "var(--custom-light-100)",
            backgroundColor: "var(--custom-red-800)",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred", {
        style: {
          color: "var(--custom-light-100)",
          backgroundColor: "var(--custom-red-800)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn">
          <Trash2 className="h-4 w-4" />
          <p className="font-bebas text-xl text-custom-dark-100">Delete</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-custom-dark-100">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="text-sm text-custom-light-100">
            Are you sure you want to delete this book? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="ghost"
            className="cursor-pointer hover:bg-custom-dark-300 hover:text-white"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer bg-custom-red-800 hover:bg-custom-red-800 text-white"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-t-2 border-dotted rounded-full animate-spin border-white" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookDialog;
