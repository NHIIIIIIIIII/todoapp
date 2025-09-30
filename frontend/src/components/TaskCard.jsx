import React, { useState } from "react";
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, Circle, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { apis } from "@/lib/apis";
import { toast } from "sonner";
import { Input } from "./ui/input";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [editing, setEditing] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title || "");

  // DELETE
  const deleteTask = async (taskId) => {
    try {
      await apis.deleteTask(taskId);
      toast.success("Nhiệm vụ đã xoá.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xoá task.", error);
      toast.error("Lỗi xảy ra khi xoá nhiệm vụ mới.");
    }
  };

  // UPDATE TITLE
  
  const updateTask = async () => {
    if (!updateTitle.trim()) {
      toast.error("Tiêu đề không được để trống");
      return;
    }

    try {
      console.log("Updating task with ID:", task._id, "Title:", updateTitle);

      await apis.updateTask(task._id,updateTitle,task.status);
      setEditing(false);
      toast.success("Cập nhật thành công");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi update task:", {
        taskId: task._id,
        error: error.message,
      });
      toast.error("Lỗi xảy ra khi cập nhật");
    }
  };

  // Cập nhật active

  const toggleTaskCompleteButton = async () => {
    try {
      const newStatus = task.status === "active" ? "complete" : "active";
      // const completedAt = newStatus === "complete" ? new Date() : null;

      console.log(
        "Toggling status for ID:",
        task._id,
        "New status:",
        newStatus
      );

      await apis.updateTask(task._id, task.title, newStatus);
      toast.success(
        `${task.title} đã ${
          newStatus === "complete" ? "hoàn thành" : "chuyển sang active"
        }.`
      );
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi toggle status:", {
        taskId: task._id,
        error: error.message,
      });
      toast.error("Lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Lỗi chỗ này này, thiếu taskID
      updateTask();
    }
  };

  return (
    <div>
      <Card
        className={cn(
          "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg",
          task.status === "complete" && "opacity-75"
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "complete" || task.status === "success"
                ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                : "text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50"
            )}
            onClick={() => toggleTaskCompleteButton()}
          >
            {task.status === "complete" ? (
              <CheckCircle2 className="size-5" /> // Icon tích xanh
            ) : (
              <Circle className="size-5" /> // Icon vòng tròn rỗng
            )}
          </Button>
        </div>
        <CardHeader>
          {/* hiển thị hoặc chỉnh sửa tiêu đề */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <Input
                autoFocus
                placeholder="Cần phải làm gì?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  setEditing(false);
                  setUpdateTitle(task.title || "");
                }}
              />
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  task.status === "complete"
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                )}
              >
                {task.title}
              </p>
            )}{" "}
          </div>

          <CardAction className="flex flex-row justify-end item-center gap-4 ">
            {/* UPDATE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditing(true);
                setUpdateTitle(task.title || "");
              }}
            >
              <Pencil className="size-4 " />
            </Button>
            {/* DELETE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task._id)}
            >
              <Trash className="size-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter>
          {task.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "No date"}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskCard;
