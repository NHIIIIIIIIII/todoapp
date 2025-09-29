import mongoose from "mongoose";

export const connectDB = async () => {
  /**
   * Hàm bất đồng bộ phải nằm trong try/catch để bắt lỗi
   * await mongoose.connect trả về một Promise
   */
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

    console.log("Liên kết CSDL thành công!");
  } catch (error) {
    console.error("Lỗi khi kết nối CSDL:", error);
    process.exit(1); // exit with error - đóng khi gặp lỗi
  }
};