import { useState, useContext, createContext, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconFlag2Filled } from "@tabler/icons-react";
import { PriorityProps } from "@/types/task";

interface PriorityContextType {
  priority: PriorityProps[];
  setPriority: React.Dispatch<React.SetStateAction<PriorityProps[]>>;
}

const PriorityContext = createContext<PriorityContextType | undefined>(
  undefined
);

export const usePriority = () => {
  const context = useContext(PriorityContext);
  if (context === undefined) {
    throw new Error("usePriority must be used within a PriorityProvider");
  }
  return context;
};

const defaultPriorities: PriorityProps[] = [
  {
    id: 1,
    level: 1,
    name: "Lowest",
    color: "#12A150",
  },
  {
    id: 2,
    level: 2,
    name: "Low",
    color: "#0E793C",
  },
  {
    id: 3,
    level: 3,
    name: "Medium",
    color: "#2684FF",
  },
  {
    id: 4,
    level: 4,
    name: "High",
    color: "#FF8B00",
  },
  {
    id: 5,
    level: 5,
    name: "Highest",
    color: "#FF5630",
  },
  {
    id: 6,
    level: 6,
    name: "Blocker",
    color: "#DE350B",
  },
];

export function PriorityProvider({ children }: { children: ReactNode }) {
  const [priority, setPriority] = useState<PriorityProps[]>(defaultPriorities);

  return (
    <PriorityContext.Provider value={{ priority, setPriority }}>
      {children}
    </PriorityContext.Provider>
  );
}

export default function PrioritySelector({
  id,
  onPriorityChange,
}: {
  id: number | undefined;
  onPriorityChange?: (priority: PriorityProps) => void;
}) {
  const { priority } = usePriority();
  const [selectedPriority, setSelectedPriority] = useState<string>(
    String(priority.find((p) => p.id === id)?.level || "")
  );

  const currentPriority =
    priority.find((p) => String(p.level) === selectedPriority) ;

  const handlePriorityChange = (value: string) => {
    setSelectedPriority(value);
    const newPriority = priority.find((p) => String(p.level) === value);
    if (newPriority && onPriorityChange) {
      onPriorityChange(newPriority);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded text-xs">
          <IconFlag2Filled color={currentPriority?.color} size={16} />
          <span className="hidden sm:inline">{currentPriority?.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs font-medium">
          Priority
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={selectedPriority}
          onValueChange={handlePriorityChange}
        >
          {priority.map((p) => (
            <DropdownMenuRadioItem
              key={p.id}
              value={String(p.level)}
              className="flex items-center gap-2 text-xs font-medium"
            >
              <IconFlag2Filled color={p.color} size={16} />
              {p.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
