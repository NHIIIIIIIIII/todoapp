import api from "./axios";

export const apis = {
  addNewTask: async (title) => {
    try {
      const result = await api.post("/tasks", { title });
      return result.data;
    } catch (error) {
      console.error("Lỗi khi thêm task:", error);
      throw new Error("Không thể thêm task, vui lòng thử lại!");
    }
  },

  viewListTask: async (dateQuery = "today") => {
    try {
      const result = await api.get(`/tasks?filter=${dateQuery}`);
      return result.data;
    } catch (error) {
      console.error("LỖI:", error);
      throw new Error("LỖI, vui lòng thử lại!");

    }
  },

  deleteTask: async (taskId) => {
    try {
      const result = await api.delete(`/tasks/${taskId}`);
      return result.data;
    } catch (error) {
      console.error("LỖI:", error);
      throw new Error("LỖI, vui lòng thử lại!");

    }
  },

  updateTask: async (taskId, title, status) => {
    try {
      let completedAt2 = new Date().toISOString()

      if (status === 'active') {
         completedAt2 = null;
      }
      const result = await api.put(`/tasks/${taskId}`, {
        // Bi cần truyền req.body vô chứ
        // Truyền j đây, truyền nhưng nó lấy ở đâu ?  , từ tham số lấy xuống
        //  Bi thích lát đổi tên j cũng được
        title, status,
        // Tiện đây mình để completedAt ở đây luôn, đỡ phải truyền props, hoặc nếu logic thì đây
        // Z cho Bi dễ hiểu ha
        completedAt: completedAt2
      });
      return result.data;
    } catch (error) {
      console.error("LỖI:", error);
      throw new Error("LỖI, vui lòng thử lại!");
    }
  },

  // API another ...


};
