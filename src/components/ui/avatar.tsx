import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarItem {
  id: number | string;
  avatar: string;
  name: string;
}

interface AvatarListProps {
  items?: AvatarItem[];
  className?: string;
  maxDisplay?: number;
  showAddButton?: boolean;
  onAddClick?: () => void;
  onAvatarClick?: (userId: string | number, user: AvatarItem) => void; // เพิ่ม callback
}

const AvatarList = React.memo(function AvatarList({
  items = [],
  className = "size-6",
  maxDisplay = 3,
  showAddButton = true,
  onAddClick,
  onAvatarClick,
}: AvatarListProps) {
  const processedItems = React.useMemo(() => {
    return items.slice(0, maxDisplay);
  }, [items, maxDisplay]);

  const remainingCount = React.useMemo(() => {
    return items.length - maxDisplay;
  }, [items.length, maxDisplay]);

  const handleAvatarClick = React.useCallback(
    (user: AvatarItem) => {
      if (onAvatarClick) {
        onAvatarClick(user.id, user);
      }
    },
    [onAvatarClick]
  );

  return (
    <div className="flex -space-x-1">
      {processedItems.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="group relative cursor-pointer"
          onClick={() => handleAvatarClick(item)}
          style={{ zIndex: processedItems.length + 2 - index }}
        >
          <Avatar
            className={cn(
              "ring-1 ring-background border-1 border-background transition-all duration-200 ease-in-out",
              "group-hover:scale-110 group-hover:z-50 group-hover:ring-primary group-hover:shadow-lg",
              "group-active:scale-95",
              className
            )}
          >
            <AvatarImage
              src={item.avatar}
              alt={`@${item.name}`}
              className="transition-all duration-200 group-hover:brightness-110"
            />
            <AvatarFallback className="text-xs transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-popover"></div>
          </div>
        </div>
      ))}

      {remainingCount > 0 && (
        <div className="group relative cursor-pointer" style={{ zIndex: 2 }}>
          <Avatar
            className={cn(
              "ring-1 ring-background border-1 border-background bg-muted transition-all duration-200 ease-in-out",
              "group-hover:scale-110 group-hover:z-50 group-hover:ring-primary group-hover:shadow-lg group-hover:bg-primary",
              "group-active:scale-95",
              className
            )}
          >
            <AvatarFallback className="text-xs font-medium transition-all duration-200">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {remainingCount} more users
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-popover"></div>
          </div>
        </div>
      )}

      {showAddButton && (
        <div className="group relative cursor-pointer" style={{ zIndex: 1 }}>
          <Button
            size="icon"
            variant="ghost"
            onClick={onAddClick}
            className={cn(
              "rounded-full border-1 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/10 transition-all duration-200 ease-in-out",
              "group-hover:scale-110 group-active:scale-95 cursor-pointer",
              className
            )}
          >
            <Plus className="h-3 w-3 transition-all duration-200 group-hover:text-primary" />
          </Button>

          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Add user
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-popover"></div>
          </div>
        </div>
      )}
    </div>
  );
});

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarList,
  type AvatarItem as AvatarProps,
};
