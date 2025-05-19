import { useState, useMemo } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  Modal,
  message,
  Input,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import categoryApi from "../../../api/categoryApi";
import dayjs from "dayjs";
import CategoryModal from "./CategoryModal";

const { Title } = Typography;

const Categories = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["categories", pagination.current, pagination.pageSize],
    queryFn: () =>
      categoryApi.getCategories({
        page: pagination.current,
        limit: pagination.pageSize,
      }),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId) => categoryApi.deleteCategory(categoryId),
    onSuccess: () => {
      message.success("Xóa danh mục thành công");

      if (pagination.current > 1) {
        const checkAndAdjustPage = async () => {
          try {
            const response = await categoryApi.getCategories({ limit: 1 });
            const totalCategories = response.pagination?.total || 0;
            const totalPages = Math.ceil(totalCategories / pagination.pageSize);

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

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Xóa danh mục thất bại");
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data) => categoryApi.createCategory(data),
    onSuccess: () => {
      message.success("Thêm danh mục thành công");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Thêm danh mục thất bại");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => categoryApi.updateCategory(id, data),
    onSuccess: () => {
      message.success("Cập nhật danh mục thành công");
      handleCloseModal();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Cập nhật danh mục thất bại"
      );
    },
  });

  const handleTableChange = (newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const showDeleteConfirm = (categoryId, categoryName) => {
    Modal.confirm({
      title: "Xác nhận xóa danh mục",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa danh mục "${categoryName}" không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deleteCategoryMutation.mutate(categoryId);
      },
    });
  };

  const handleOpenModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({
        id: editingCategory._id,
        data: values,
      });
    } else {
      createCategoryMutation.mutate(values);
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
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
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={
              deleteCategoryMutation.isPending &&
              deleteCategoryMutation.variables === record._id
            }
            onClick={() => showDeleteConfirm(record._id, record.name)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // === FILTERING ===
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(filterName.toLowerCase());
      const matchesDate = filterDate
        ? dayjs(item.createdAt).isSame(filterDate, "day")
        : true;
      return matchesName && matchesDate;
    });
  }, [data, filterName, filterDate]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>Quản lý danh mục</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          Thêm danh mục
        </Button>
      </div>

      {/* BỘ LỌC */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Lọc theo tên danh mục"
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
          showTotal: (total) => `Tổng cộng ${total} danh mục`,
          hideOnSinglePage: true,
        }}
        onChange={handleTableChange}
      />

      <CategoryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingCategory={editingCategory}
        loading={
          createCategoryMutation.isPending || updateCategoryMutation.isPending
        }
      />
    </div>
  );
};

export default Categories;
