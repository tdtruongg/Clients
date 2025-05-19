import { useState, useMemo } from "react";
import { Typography, Table, Button, Space, Tag, Modal, message, Input, DatePicker } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../../api/userApi";
import dayjs from "dayjs";
import useProfile from "../../../hook/useProfile";

const { Title } = Typography;

const Users = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const queryClient = useQueryClient();
  const { profile } = useProfile();

  const { data, isLoading } = useQuery({
    queryKey: ["users", pagination.current, pagination.pageSize],
    queryFn: () =>
      userApi.getUsers({
        page: pagination.current,
        limit: pagination.pageSize,
      }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => userApi.deleteUser(userId),
    onSuccess: () => {
      message.success("Xóa người dùng thành công");

      if (pagination.current > 1) {
        const checkAndAdjustPage = async () => {
          try {
            const response = await userApi.getUsers({ limit: 1 });
            const totalUsers = response.pagination?.total || 0;
            const totalPages = Math.ceil(totalUsers / pagination.pageSize);

            if (pagination.current > totalPages) {
              setPagination((prev) => ({
                ...prev,
                current: Math.max(1, totalPages),
              }));
            }
          } catch (error) {
            console.error("Lỗi khi kiểm tra phân trang:", error);
          }
        };

        checkAndAdjustPage();
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Xóa người dùng thất bại");
    },
  });

  const handleTableChange = (newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const showDeleteConfirm = (userId, userName) => {
    if (profile && profile._id === userId) {
      message.error("Bạn không thể xóa tài khoản của chính mình!");
      return;
    }

    Modal.confirm({
      title: "Xác nhận xóa người dùng",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa người dùng ${userName} không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteUserMutation.mutate(userId);
      },
    });
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "Chưa cập nhật",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "ADMIN" ? "blue" : "green"}>{role}</Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={
              deleteUserMutation.isPending &&
              deleteUserMutation.variables === record._id
            }
            onClick={() => showDeleteConfirm(record._id, record.name)}
            disabled={profile && profile._id === record._id}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Xử lý lọc dữ liệu theo tên và ngày tạo trên client
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesDate = filterDate
        ? dayjs(item.createdAt).isSame(filterDate, "day")
        : true;
      return matchesName && matchesDate;
    });
  }, [data, filterName, filterDate]);

  return (
    <div>
      <Title level={2} className="mb-4">
        Quản lý người dùng
      </Title>

      {/* Bộ lọc */}
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <Input
          placeholder="Lọc theo tên"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ width: 200 }}
        />
        <DatePicker
          placeholder="Lọc theo ngày tạo"
          value={filterDate}
          onChange={(date) => setFilterDate(date)}
          format="DD/MM/YYYY"
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: "max-content" }}
        sortDirections={[]}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredData.length,
          showTotal: (total) => `Tổng cộng ${total} người dùng`,
          hideOnSinglePage: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Users;
