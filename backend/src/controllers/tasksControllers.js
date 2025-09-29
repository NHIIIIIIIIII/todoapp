
import Task from "../models/Tasks.js";

// async - await : hàm bất đồng bộ
// export const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find().sort({createdAt: -1 }); // sort: để sắp xếp; -1 : từ dưới lên
//         res.status(200).json(tasks);
//     } catch (error) {
//         console.error("Lỗi khi goi getAllTasks", error);
//         res.status(500).json({ message: "Lỗi hệ thống" });
//     }
// }

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [{ $match: { status: "complete" } }, { $count: "count" }],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};



export const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);

    } catch (error) {
        console.error("Lỗi khi goi createTask", error);
        res.status(500).json({ message: "Lỗi hệ thống" });

    }
}

// export const updateTask = async (req, res) => {
//     // const { id } = req.params;
//     // res.status(200).json({message: `Nhiệm vụ có id ${id} đã được update thành công.`});
//     try {
//         const { title, status, completedAt } = req.body // gọi các biến có thể update
//         const updateTask = await Task.findByIdAndUpdate(
//             req.params.id,
//             { title, status, completedAt }, { new: true }
//         );
//         if (!updateTask) {
//             return res.status(400).json({ message: "Không tìm thấy nhiệm vụ" })
//         }
//         res.status(200).json(updateTask)

//     } catch (error) {
//         console.error("Lỗi khi goi updateTask", error);
//         res.status(500).json({ message: "Lỗi hệ thống" });

//     }
// }

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const { id } = req.params;

        console.log("UPDATE REQUEST - ID:", id);

        const updateTask = await Task.findByIdAndUpdate(
            id,
            { title, status, completedAt }, 
            { new: true }
        );

        if (!updateTask) {
            return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" });
        }

        res.status(200).json(updateTask);

    } catch (error) {
        console.error("Lỗi khi gọi updateTask:", error);
        
        // Xử lý lỗi ID không hợp lệ
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }
        
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(
            req.params.id
        );
        if (!deleteTask) {
            return res.status(404).json({ message: "Không tìm thấy nhiệm vụ" })
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        console.error("Lỗi khi goi deleteTask", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }

    // HÀM LỌC TASK THEO STATUS 
const filterTasksByStatus = (tasks, filter) => {
  if (!tasks || !Array.isArray(tasks)) return [];
  if (!filter || filter === "all") return tasks;

  return tasks.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete" || task.status === "success";
      default:
        return true;
    }
  });
};
}
