import React from "react";
import { useState } from "react";
import { Pagination } from "antd";

const Paginate = ({ total, current, pageSize, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      showSizeChanger
      showTotal={(total) => `Total ${total} items`}
      onChange={onChange}
    />
  );
};
export default Paginate;
