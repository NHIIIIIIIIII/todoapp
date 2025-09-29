import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { apis } from "@/lib/apis";
import { visibleTaskLimit } from "@/lib/data";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch tasks với date query
  const fetchTasks = async (dateFilter = dateQuery) => {
    setLoading(true);
    try {
      const data = await apis.viewListTask(dateFilter);
      
      // API mới trả về { tasks, activeCount, completeCount }
      setTaskBuffer(data.tasks || []);
      setActiveTaskCount(data.activeCount || 0);
      setCompleteTaskCount(data.completeCount || 0);
      
    } catch (error) {
      console.error("Lỗi lấy ds", error);
      setTaskBuffer([]);
      setActiveTaskCount(0);
      setCompleteTaskCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks khi dateQuery thay đổi
  useEffect(() => {
    fetchTasks(dateQuery);
  }, [dateQuery]);

  const handleTaskChanged = () => {
    fetchTasks(dateQuery);
  };

  // Reset page khi filter hoặc dateQuery thay đổi
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  // Lọc tasks theo status (chỉ cho UI filter)
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete" || task.status === "success";
      default:
        return true;
    }
  });

  // Tự động điều chỉnh trang khi data thay đổi
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    // Nếu trang hiện tại lớn hơn tổng số trang mới, chuyển về trang cuối
    if (page > newTotalPages && newTotalPages > 0) {
      setPage(newTotalPages);
    }

    // Nếu trang hiện tại trống và không phải trang đầu tiên, quay lại trang trước
    if (filteredTasks.length > 0) {
      const currentPageTasks = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
      );
      if (currentPageTasks.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
      }
    }
  }, [filteredTasks, page]);

  // Phân trang hiển thị
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  // Tính tổng số task (sử dụng counts từ API)
  const totalTasks = activeTaskCount + completeTaskCount;

  // Navigation handlers
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Xử lý khi date query thay đổi
  const handleDateQueryChange = (newDateQuery) => {
    setDateQuery(newDateQuery);
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
            radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
            radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilters
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            filter={filter}
            setFilter={setFilter}
          />

          <DateTimeFilter 
            dateQuery={dateQuery} 
            setDateQuery={handleDateQueryChange}
          />

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              <TaskList
                filter={filter}
                filteredTasks={visibleTasks}
                handleTaskChanged={handleTaskChanged}
              />

              {totalPages > 1 && (
                <TaskListPagination
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handlePageChange={handlePageChange}
                  page={page}
                  totalPages={totalPages}
                />
              )}
            </>
          )}

          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            totalTasksCount={totalTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;