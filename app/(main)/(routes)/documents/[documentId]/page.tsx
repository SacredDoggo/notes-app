"use client";

import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Navbar } from "@/app/(main)/_components/navbar";

import { Spinner } from "@/components/spinner";
import { Banner } from "@/app/(main)/_components/banner";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
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
      <div>
        <Navbar id={document._id} ogTitle={document.title} />
        <Banner id={document._id} isArchived={document.isArchived} />
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