import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0, totalTasksCount = 0 }) => {
  console.log("Footer props:", {
    completedTasksCount,
    activeTasksCount,
    totalTasksCount,
  });

  return (
    <div>
      {totalTasksCount > 0 && (
        <div className="text-center">
          <p className="text-xl text-red-600">
            {completedTasksCount > 0 ? (
              <>
                Bạn đã hoàn thành <strong>{completedTasksCount}</strong> nhiệm vụ, còn{" "}
                <strong>{activeTasksCount}</strong> chưa hoàn thành. 
                <hr/>
                Tổng số nhiệm vụ <strong>{totalTasksCount}</strong>.
              </>
            ) : (
              <>
                Hãy bắt đầu làm <strong>{activeTasksCount}</strong> nhiệm vụ.
              </>
            )}
          </p>
        </div>
      )}

      {totalTasksCount === 0 && (
        <p className="text-center text-red-600">
          Tổng số nhiệm vụ của bạn là <strong>{totalTasksCount}</strong>. Vui lòng hãy thêm nhiệm vụ mới.
        </p>
      )}
    </div>
  );
};

export default Footer;