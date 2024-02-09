"use client";

import { useImageDropzone } from "@/hooks/use-image-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const ImageDropzoneModal = () => {
  const update = useMutation(api.documents.update);
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const imageDropzone = useImageDropzone();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();

  const onClose = () => {
    setIsSubmitting(false);
    setFile(undefined);
    imageDropzone.onClose();
  }

  const handleFileChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: imageDropzone.url
        }
      });


      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      });

      onClose();
    }
  }

  return (
    <Dialog open={imageDropzone.isOpen} onOpenChange={imageDropzone.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={handleFileChange}
        />
      </DialogContent>
    </Dialog>
  );
}