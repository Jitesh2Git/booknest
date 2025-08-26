import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
      <XCircle className="h-12 w-12 text-custom-red-500" />

      <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
      <p className="text-custom-light-100 max-w-sm">
        The page you are looking for doesn’t exist. Try going back to the
        homepage.
      </p>
      <Button className="btn" onClick={() => navigate("/")}>
        <p className="font-bebas text-xl text-custom-dark-100">Back to Home</p>
      </Button>
    </div>
  );
};

export default NotFound;
