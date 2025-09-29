import * as React from "react";
import { options } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  return (
    <Select value={dateQuery} onValueChange={setDateQuery}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Chọn thời gian">
          {dateQuery
            ? options.find((option) => option.value === dateQuery)?.label
            : options[0].label}
        </SelectValue>
        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateTimeFilter;