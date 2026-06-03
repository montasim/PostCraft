"use client";

import { useState } from "react";
import { IconCheck, IconSelector, IconClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAutocompleteTimepicker } from "@/hooks/useAutocompleteTimepicker";

const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  is24Hour?: boolean;
  locale?: string;
  timeZone?: string;
  placeholder?: string;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  is24Hour = false,
  locale = "en-US",
  timeZone = currentTimezone,
  placeholder = "Select time...",
  className
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const { timeOptions, formatTime } = useAutocompleteTimepicker({
    is24Hour,
    locale,
    timeZone,
  });

  const selectedTime = new Date();
  if (value) {
    const [h, m] = value.split(":").map(Number);
    selectedTime.setHours(h ?? 0, m ?? 0, 0, 0);
  }

  const handleSelect = (time: Date) => {
    const hh = time.getHours().toString().padStart(2, "0");
    const mm = time.getMinutes().toString().padStart(2, "0");
    onChange(`${hh}:${mm}`);
    setOpen(false);
  };

  const currentTimeString = value ? formatTime(selectedTime) : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[140px] min-h-[44px] justify-between font-normal bg-transparent dark:bg-input/30 hover:bg-transparent dark:hover:bg-input/30", className)}
        >
          <div className="flex items-center">
            <IconClock className="mr-2 h-4 w-4" data-testid="ClockIcon" />
            {currentTimeString}
          </div>
          <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search time..."
            data-testid="CommandInput"
          />
          <CommandList>
            <CommandEmpty>No time found.</CommandEmpty>
            <CommandGroup>
              {timeOptions.map((time, index) => {
                const timeString = formatTime(time);
                const isSelected =
                  value &&
                  time.getHours() === selectedTime.getHours() &&
                  time.getMinutes() === selectedTime.getMinutes();
                return (
                  <CommandItem
                    key={index}
                    value={timeString}
                    onSelect={() => handleSelect(time)}
                  >
                    <IconCheck
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {timeString}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
