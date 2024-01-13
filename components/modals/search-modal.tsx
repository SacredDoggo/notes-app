import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { File } from "lucide-react";
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";

import { useSearch } from "@/hooks/use-search"

export const SearchModal = () => {
  const search = useSearch();
  const router = useRouter();
  const params = useParams();

  const handleSelect = (id: string) => {
    router.push(`/documents/${id}`);
  }


  const documents = useQuery(api.documents.getSearchDocuments);

  return (
    <CommandDialog open={search.isOpen} onOpenChange={search.onClose}>
      <CommandInput placeholder="Search all your notes here..." />
      <CommandList>
        <CommandGroup heading="Notes">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              title={document.title}
              value={`${document.title}-${document._id}`}
              onSelect={() => handleSelect(document._id)}
            >
              <div className="flex gap-x-2">
                <File className="h-5 w-5 text-muted-foreground" />
                <span className={cn(
                  "truncate",
                  params.documentId !== document._id && "text-muted-foreground"
                  )}
                >
                  {document.title}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}