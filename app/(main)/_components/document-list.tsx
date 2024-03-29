"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { File } from "lucide-react";

import { Item } from "./item";

interface DocumentListProps {
  isMobile: boolean;
  handleDocSelectNavbarCollapse: () => void;
}

export const DocumentList = ({ isMobile, handleDocSelectNavbarCollapse }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const documents = useQuery(api.documents.getUserDocuments);
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const handleClick = (id: string) => {
    router.push(`/documents/${id}`);
  if (isMobile) handleDocSelectNavbarCollapse();
  }

  const handleArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: Id<"documents">) => {
    event?.stopPropagation();

    const promise = archive({ id: id });

    toast.promise(promise, {
      loading: "Moving note to trash...",
      success: "Note removed!",
      error: "Failed to remove note."
    });
  };

  return (
    <div className="flex flex-col my-2">
      {documents?.map((document) => (
        <Item
          key={document._id}
          active={params.documentId === document._id}
          document={true}
          icon={File}
          title={document.title}
          documentIcon={document.icon}
          onClick={() => handleClick(document._id as string)}
          onArchive={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleArchive(event, document._id)}
        />
      ))}

    </div>
  );
}