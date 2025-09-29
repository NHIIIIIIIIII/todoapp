import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String, //kiểu dữ liệu
      required: true,  //bắt buộc nhập - yêu cầu
      trim: true,  //loại bỏ khoảng trắng thừa
    },
    status: {
      type: String,
      enum: ["active", "complete"], //chỉ cho phép 2 giá trị này
      default: "active",  // giá trị mặc định
    },
    completedAt: {
      type: Date,
      default: null, //mặc định null
    },
  },
  {
    timestamps: true, // createdAt và updatedAt tự động thêm vào
  }
);

const Task = mongoose.model("Task", taskSchema); 
export default Task;