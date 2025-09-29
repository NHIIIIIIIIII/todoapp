import React from "react";
import { Card } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { FilterType } from "@/lib/data";
import { cn } from "@/lib/utils";

const StatsAndFilters = ({
  //truyền từ component cha vào StatsAndFilters
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 p-4">
      {/* Stats */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="text-white bg-gradient-to-r from-orange-500 to-red-600"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="text-white bg-gradient-to-r from-success to-green-600"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Filters */}

      <div className="flex gap-4">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className={cn(
              "capitalize transition-all duration-200",
              filter === type
                ? "bg-blue-600 text-white shadow-md border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            )}
            onClick={() => setFilter(type)}
          >
            <ListFilter className="size-5" />
            {FilterType[type]}
          </Button>
        ))}
        {/*         
        <Card className="px-4 py-2 text-center font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
          Tất cả
        </Card>
        <Card className="px-4 py-2 text-center font-medium hover:bg-primary hover:text-primary-foreground rounded-md transition-colors">
          Đang làm
        </Card>
        <Card className="px-4 py-2 text-center font-medium hover:bg-success hover:text-success-foreground rounded-md transition-colors">
          Đã hoàn thành
        </Card> */}
      </div>
    </div>
  );
};

export default StatsAndFilters;
