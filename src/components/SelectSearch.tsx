

import { Fragment, useState } from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
  {
    continent: "America",
    items: [
      { value: "United States", flag: "🇺🇸" },
      { value: "Canada", flag: "🇨🇦" },
      { value: "Mexico", flag: "🇲🇽" },
    ],
  },
  {
    continent: "Africa",
    items: [
      { value: "South Africa", flag: "🇿🇦" },
      { value: "Nigeria", flag: "🇳🇬" },
      { value: "Morocco", flag: "🇲🇦" },
    ],
  },
  {
    continent: "Asia",
    items: [
      { value: "China", flag: "🇨🇳" },
      { value: "Japan", flag: "🇯🇵" },
      { value: "India", flag: "🇮🇳" },
    ],
  },
  {
    continent: "Europe",
    items: [
      { value: "United Kingdom", flag: "🇬🇧" },
      { value: "France", flag: "🇫🇷" },
      { value: "Germany", flag: "🇩🇪" },
    ],
  },
  {
    continent: "Oceania",
    items: [
      { value: "Australia", flag: "🇦🇺" },
      { value: "New Zealand", flag: "🇳🇿" },
    ],
  },
]

export default function SelectSearch() {
  // const id = useId()
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            size="sm"
            //className="w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            {value ? (
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-lg leading-none">
                  {
                    countries
                      .map((group) =>
                        group.items.find((item) => item.value === value)
                      )
                      .filter(Boolean)[0]?.flag
                  }
                </span>
                <span className="truncate">{value}</span>
              </span>
            ) : (
              <span >Select country</span>
            )}
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              {countries.map((group) => (
                <Fragment key={group.continent}>
                  <CommandGroup heading={group.continent}>
                    {group.items.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue)
                          setOpen(false)
                        }}
                      >
                        <span className="text-lg leading-none">
                          {country.flag}
                        </span>{" "}
                        {country.value}
                        {value === country.value && (
                          <CheckIcon size={16} className="ml-auto" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )
}
