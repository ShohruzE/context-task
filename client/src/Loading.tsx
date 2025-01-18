import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle size={36} className="animate-spin" />
    </div>
  );
}
