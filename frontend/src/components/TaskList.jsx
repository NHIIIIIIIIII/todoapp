import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="container rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 to-blue-500">
      <div className="space-y-3 ">
        {filteredTasks.map((task, index) => (
          <TaskCard
            key={task._id ?? index}
            task={task}
            index={index}
            handleTaskChanged={handleTaskChanged}
            
          />
         ))}
      </div>
    </div>
  );
};

export default TaskList;
