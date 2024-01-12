"use client";

import { useSettings } from "@/hooks/use-settings";
import { ModeToggle } from "../mode-toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

export const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="font-medium">
            My settings
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearence
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Fable looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}