import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import { apis } from "@/lib/apis";
import { toast } from "sonner";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        const result = await apis.addNewTask(newTaskTitle);
        console.log(result);
        toast.success(
          `Nhiệm vụ ${result ? result.title : "WWWWWWWWW"} thêm thành công.`
        );
        handleNewTaskAdded();
         setNewTaskTitle("");
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm task.", error);
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.");
      }
    } else {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };
  console.log(newTaskTitle);
  return (
    <div className="text-center">
      {/* Viền gradient */}
      <div className="container rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 to-blue-500">
        {/* Card bên trong giữ nền trắng */}
        <Card className="rounded-2xl bg-white shadow-md hover:shadow-lg p-2 flex flex-row items-center gap-2 dark:bg-gray-900">
          <Input
            className="flex-1 border-none focus:ring-0 rounded-xl"
            type="text"
            placeholder="Nhập nhiệm vụ"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="px-4 rounded-xl"
            onClick={addTask}
            // onClick={addTask()}
            // onClick = {(e) => addTask(e)}
            disabled={!newTaskTitle.trim()}
          >
            Thêm
            <BadgePlus className="size-5" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddTask;
