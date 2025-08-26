import { useState, useEffect } from "react";
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
import { Input } from "./ui/input";
import type {
  BookOverviewModalProps,
  BookResponse,
  UpdateBookInput,
} from "@/lib/types";
import { Pencil } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { updateBook } from "@/lib/actions";
import { toast } from "sonner";
import { validateBookForm } from "@/lib/validations";

const BookUpdateModal = ({ book, setBook }: BookOverviewModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState<number | "">("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && book) {
      setTitle(book.title ?? "");
      setAuthor(book.author ?? "");
      setDescription(book.description ?? "");
      setPublishYear(book.publishYear ?? "");
      setCoverImage(book.coverImage ?? "");
    }
  }, [open, book]);

  const handleSubmit = async () => {
    if (!book) return;

    const error = validateBookForm({
      title,
      author,
      description,
      publishYear,
      coverImage,
    });

    if (error) {
      toast.error(error, {
        style: {
          color: "var(--custom-light-100)",
          backgroundColor: "var(--custom-red-800)",
        },
      });
      return;
    }

    setLoading(true);

    try {
      const input: UpdateBookInput = {
        id: book.id,
        title,
        author,
        description,
        publishYear: typeof publishYear === "number" ? publishYear : undefined,
        coverImage,
      };

      const res: BookResponse | null = await updateBook(input);

      if (res?.ok) {
        toast.success("Book updated successfully!", {
          style: {
            color: "var(--custom-dark-200)",
            backgroundColor: "var(--custom-green-500)",
          },
        });
        setBook(res.book);
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to update book.", {
          style: {
            color: "var(--custom-light-100)",
            backgroundColor: "var(--custom-red-800)",
          },
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("An unexpected error occurred.", {
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
          <Pencil className="h-4 w-4" />
          <p className="font-bebas text-xl text-custom-dark-100">Update</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full bg-custom-dark-100 max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
          <DialogDescription className="text-sm text-custom-light-100">
            Edit book details below
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <Label htmlFor="publishYear">Publish Year</Label>
            <Input
              id="publishYear"
              type="number"
              placeholder="Publish Year"
              value={publishYear}
              onChange={(e) => setPublishYear(Number(e.target.value))}
              className="form-input"
            />
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="text"
              placeholder="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

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
            className="cursor-pointer bg-custom-primary hover:bg-custom-primary text-custom-dark-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 border-2 border-t-2 border-dotted rounded-full animate-spin
                border-custom-dark-200"
                />
                <span>Updating...</span>
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookUpdateModal;
