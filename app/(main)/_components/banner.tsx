import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";

interface BannerProps {
  id: Id<"documents">;
  coverImageUrl?: string;
}

export const Banner = ({ id, coverImageUrl }: BannerProps) => {
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const { edgestore } = useEdgeStore();

  const handleRestore = () => {
    const promise = restore({ id: id });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  }

  const handleRemove = () => {
    const promise = remove({ id: id });

    if (coverImageUrl) edgestore.publicFiles.delete({
      url: coverImageUrl,
    });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });
  }

  return (
    <div className="h-[50px] w-full flex items-center text-white justify-center gap-x-2 bg-rose-500">
      <span className="text-sm font-medium">This note has been removed.</span>
      <Button
        onClick={handleRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}