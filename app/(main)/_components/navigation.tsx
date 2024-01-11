import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";

import { UserProfileItem } from "./user-profile-item";
import { MenuItems } from "./menu-items";
import { DocumentList } from "./document-list";

export const Navigation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapseSidebar();
    } else {
      resetSidebar();
    }
  }, [isMobile]);

  const collapseSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResizing(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResizing(false), 300);
    }
  };

  const resetSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResizing(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );

      setTimeout(() => setIsResizing(false), 300);
    }
  };

  // Sidebar resize code-------------------------------------------------------------------------------------
  const handleManualResize = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    addEventListener("mousemove", handleMouseMove);
    addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (event: MouseEvent) => {
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    
    if (navbarRef.current && sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }

  const handleMouseUp = () => {
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("mouseup", handleMouseUp);
  }
  // --------------------------------------------------------------------------------------------------------

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full overflow-y-auto left w-60 bg-secondary relative flex flex-col z-50",
          isResizing && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapseSidebar}
          className={cn(
            "opacity-0 group-hover/sidebar:opacity-100 text-muted-foreground absolute top-3 right-2 h-6 w-6 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <UserProfileItem />
        <MenuItems />
        <DocumentList />
        {!isMobile && (
          <div
            onClick={resetSidebar}
            onMouseDown={handleManualResize}
            className="opacity-0 group-hover/sidebar:opacity-100 transition absolute top-0 right-0 h-full w-1 bg-primary/10 hover:cursor-ew-resize"
          />
        )}
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute z-50 top-0 left-60 w-[calc(100%-240px)]",
          isResizing && "transition-all duration-300 ease-in-out"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed &&
            <MenuIcon
              role="button"
              onClick={resetSidebar}
              className="h-6 w-6 hover:cursor-pointer rounded-sm text-muted-foreground"
            />
          }
        </nav>
      </div>
    </>
  );
}