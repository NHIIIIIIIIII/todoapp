import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config(); // load environment variables from .env file
const PORT = process.env.PORT || 5001

const app = express();

app.use(express.json()); // Kiểm tra xem exp đi qua có phải json ko nếu có -> chuyển json => object. Biến body JSON text thành req.body mà có thể dùng trực tiếp trong route.
/** middleware là một hàm trung gian chạy trong quá trình xử lý một request. Nó có thể:
Nhận vào request (req), response (res) và hàm next (next).
Các loại middleware:
express.json()
logger: in ra thông tin request, response, và thời gian xử lý.
auth: kiểm tra token người dùng hợp lệ > nếu hợp lệ > cho phép tiếp tục xử lý request, nếu không > trả về lỗi.
*/

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use('/api/tasks', taskRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5001');
  });
}); // connect to the database



