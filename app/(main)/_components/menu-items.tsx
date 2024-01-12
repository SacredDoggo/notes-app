import { PlusCircle, Search, Settings } from "lucide-react";
import { Item } from "./item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSettings } from "@/hooks/use-settings";

export const MenuItems = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const settings = useSettings();

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((doc) => (router.push(`/documents/${doc}`)));

    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create new note."
    })
  }

  return (
    <div className="my-2 flex flex-col">
      <Item 
        icon={Search}
        title="Search"
        onClick={() => {}}
      />
      <Item 
        icon={Settings}
        title="Settings"
        onClick={settings.onOpen}
      />
      <Item 
        icon={PlusCircle}
        title="New note"
        onClick={handleCreate}
      />
    </div>
  );
}