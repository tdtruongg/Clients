import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status="403"
        title="Không có quyền truy cập"
        subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
        extra={
          <Link to="/">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        }
      />
    </div>
  );
};

export default Unauthorized;
