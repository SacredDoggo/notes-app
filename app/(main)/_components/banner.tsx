import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";

interface BannerProps {
  id: Id<"documents">;
  isArchived: boolean;
}

export const Banner = ({ id, isArchived }: BannerProps) => {
  if (!isArchived) return;

  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

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

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  }

  return (
    <div className="h-[50px] w-full flex items-center justify-center gap-x-2 bg-rose-500">
      <span className="text-sm font-medium">This note has been removed.</span>
      <Button
        onClick={handleRestore}
        variant="outline"
        className="bg-rose-500 opacity-85 hover:opacity-100 hover:bg-rose-500 border-white"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          variant="outline"
          className="bg-rose-500 opacity-85 hover:opacity-100 hover:bg-rose-500 border-white"
        >
          Delete Page
        </Button>
      </ConfirmModal>
    </div>
  );
}