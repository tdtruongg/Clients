import { useState } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  message,
  Flex,
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
import postApi from "../../../api/postApi";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Blogs = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    createdRange: [],
    likes: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", pagination.current, pagination.pageSize],
    queryFn: () =>
      postApi.getPosts({
        page: pagination.current,
        limit: pagination.pageSize,
      }),
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => postApi.deletePost(postId),
    onSuccess: () => {
      message.success("Xóa bài viết thành công");

      if (pagination.current > 1) {
        const checkAndAdjustPage = async () => {
          try {
            const response = await postApi.getPosts({ limit: 1 });
            const totalPosts = response.pagination?.total || 0;
            const totalPages = Math.ceil(totalPosts / pagination.pageSize);

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

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Xóa bài viết thất bại");
    },
  });

  const handleTableChange = (newPagination) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const showDeleteConfirm = (postId, postTitle) => {
    Modal.confirm({
      title: "Xác nhận xóa bài viết",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa bài viết "${postTitle}" không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        deletePostMutation.mutate(postId);
      },
    });
  };

  const handleAddNewPost = () => {
    navigate("/admin/blogs/create");
  };

  const handleEditPost = (post) => {
    navigate(`/admin/blogs/${post._id}/edit`);
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      width: "15%",
      render: (author) => author?.name || "Không có tác giả",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: "15%",
      render: (category) => category?.name || "Không có danh mục",
    },
    {
      title: "Thẻ",
      dataIndex: "tags",
      key: "tags",
      width: "20%",
      render: (tags) => {
        if (!tags || tags.length === 0) return "Không có thẻ";
        const displayTags = tags.slice(0, 3);
        const remaining = tags.length - 3;
        return (
          <Flex wrap="wrap" gap="small">
            {displayTags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
            {remaining > 0 && <Tag color="default">+{remaining}</Tag>}
          </Flex>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: "Lượt thích",
      dataIndex: "likesCount",
      key: "likesCount",
      width: "10%",
      sorter: (a, b) => (a.likesCount || 0) - (b.likesCount || 0),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditPost(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={
              deletePostMutation.isPending &&
              deletePostMutation.variables === record._id
            }
            onClick={() => showDeleteConfirm(record._id, record.title)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = data?.data?.filter((item) => {
    const matchTitle = item.title
      ?.toLowerCase()
      .includes(filters.title.toLowerCase());
    const matchCategory = item.category?.name
      ?.toLowerCase()
      .includes(filters.category.toLowerCase());
    const matchLikes =
      filters.likes === "" || String(item.likesCount || 0).includes(filters.likes);

    const matchDate =
      filters.createdRange.length === 0 ||
      (dayjs(item.createdAt).isAfter(filters.createdRange[0], "day") &&
        dayjs(item.createdAt).isBefore(filters.createdRange[1], "day"));

    return matchTitle && matchCategory && matchLikes && matchDate;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={2}>Quản lý bài viết</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddNewPost}
        >
          Thêm bài viết
        </Button>
      </div>

      <Flex gap="small" wrap="wrap" className="mb-4">
        <Input
          placeholder="Tìm theo tiêu đề"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          style={{ width: 220 }}
        />
        <Input
          placeholder="Tìm theo danh mục"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          style={{ width: 220 }}
        />
        <RangePicker
          placeholder={["Từ ngày", "Đến ngày"]}
          value={filters.createdRange}
          onChange={(dates) => setFilters({ ...filters, createdRange: dates || [] })}
        />
        <Input
          placeholder="Tìm theo lượt thích"
          value={filters.likes}
          onChange={(e) => setFilters({ ...filters, likes: e.target.value })}
          style={{ width: 180 }}
        />
      </Flex>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: 1300 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.pagination?.total || 0,
          showTotal: (total) => `Tổng cộng ${total} bài viết`,
          hideOnSinglePage: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Blogs;
