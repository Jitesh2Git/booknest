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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import book from "@/assets/book.svg";
import { addBook } from "@/lib/actions";
import type { AddBookInput, AddBookModalProps } from "@/lib/types";
import { validateBookForm } from "@/lib/validations";

const AddBookModal = ({ refresh, setRefresh }: AddBookModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState<number | "">("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
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

    const newBook: AddBookInput = {
      title,
      author,
      description,
      publishYear: Number(publishYear),
      coverImage: coverImage || undefined,
    };

    try {
      const res = await addBook(newBook);

      if (res?.ok) {
        toast.success(res.message || "Book added successfully.", {
          style: {
            color: "var(--custom-dark-200)",
            backgroundColor: "var(--custom-green-500)",
          },
        });
        setRefresh(!refresh);
        onCancel();
      } else {
        toast.error("Failed to add book.", {
          style: {
            color: "var(--custom-light-100)",
            backgroundColor: "var(--custom-red-800)",
          },
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
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

  const onCancel = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setPublishYear("");
    setCoverImage("");
    setOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn">
          <img
            src={book}
            alt="book"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className="font-bebas text-xl text-custom-dark-100">Add Book</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg w-full bg-custom-dark-100 max-h-[80%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription className="text-sm text-custom-light-100">
            Enter book details below
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
            onClick={onCancel}
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
                <span>Adding...</span>
              </div>
            ) : (
              "Add"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
