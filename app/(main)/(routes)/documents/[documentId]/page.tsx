"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Spinner } from "@/components/spinner";
import { Toolbar } from "@/app/(main)/_components/toolbar";
import { CoverImage } from "@/components/cover-image";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);

  const update = useMutation(api.documents.update);
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }

  try {
    const document = useQuery(api.documents.getById, {
      documentId: params.documentId
    });


    if (document === undefined) {
      return (
        <div className="flex h-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

    if (document === null) {
      return <div>Not found</div>
    }

    return (
      <div className="pb-40 pt-[10vh]">
        <CoverImage url={document.coverImage} />
        <div className="w-full md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar 
            id={params.documentId} 
            icon={document.icon} 
            initialTitle={document.title} 
            coverImageUrl={document.coverImage} 
          />
          <Editor
            onChange={onChange}
            initialContent={document.content}
          />
        </div>
      </div>
    );

  } catch (error) {
    const errorMessage = error instanceof ConvexError ? error.data : "UEC";

    if (errorMessage === "Not found") {
      return (
        <div>Not found</div>
      );
    }
    if (errorMessage === "Unauthorized") {
      return (
        <div>Not authorized to view this document.</div>
      );
    }

    if (errorMessage === "UEC") {
      return (
        <div>Unexpected error occurred.</div>
      );
    }
  }
}

export default DocumentIdPage;