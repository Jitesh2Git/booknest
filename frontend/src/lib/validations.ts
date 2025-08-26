export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateBookForm = (data: {
  title: string;
  author: string;
  description: string;
  publishYear: string | number;
  coverImage?: string;
}): string | null => {
  const { title, author, description, publishYear, coverImage } = data;

  if (!title || !author || !description || !publishYear) {
    return "Please fill in all required fields.";
  }

  if (coverImage && !isValidUrl(coverImage)) {
    return "Cover image must be a valid URL.";
  }

  return null;
};
