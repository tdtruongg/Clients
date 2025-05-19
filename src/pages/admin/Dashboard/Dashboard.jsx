import { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Avatar,
  Tabs,
  Badge,
  Tooltip,
  Input,
} from "antd";
import {
  UserOutlined,
  LikeOutlined,
  CommentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../api/userApi";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const Dashboard = () => {
  const [likersPagination, setLikersPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [commentersPagination, setCommentersPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [likersSearch, setLikersSearch] = useState("");
  const [commentersSearch, setCommentersSearch] = useState("");

  const { data: mostActiveLikersData, isLoading: likersLoading } = useQuery({
    queryKey: [
      "mostActiveLikers",
      likersPagination.current,
      likersPagination.pageSize,
    ],
    queryFn: () =>
      userApi.getMostActiveLikers({
        page: likersPagination.current,
        limit: likersPagination.pageSize,
      }),
  });

  const { data: mostActiveCommentersData, isLoading: commentersLoading } =
    useQuery({
      queryKey: [
        "mostActiveCommenters",
        commentersPagination.current,
        commentersPagination.pageSize,
      ],
      queryFn: () =>
        userApi.getMostActiveCommenters({
          page: commentersPagination.current,
          limit: commentersPagination.pageSize,
        }),
    });

  const handleLikersTableChange = (pagination) => {
    setLikersPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleCommentersTableChange = (pagination) => {
    setCommentersPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const likersColumns = [
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={user.avatar}
            icon={!user.avatar && <UserOutlined />}
            size={40}
            style={{ marginRight: 12 }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#999" }}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Bài viết đã like",
      dataIndex: "likedPosts",
      key: "likedPosts",
      render: (likedPosts) => (
        <Tooltip
          title={
            <div>
              {likedPosts.map((post, index) => (
                <div key={index}>{post.title}</div>
              ))}
            </div>
          }
        >
          <Badge
            count={likedPosts.length}
            style={{ backgroundColor: "#52c41a" }}
            showZero
          />
        </Tooltip>
      ),
    },
  ];

  const commentersColumns = [
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={user.avatar}
            icon={!user.avatar && <UserOutlined />}
            size={40}
            style={{ marginRight: 12 }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "#999" }}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số bình luận",
      dataIndex: "commentCount",
      key: "commentCount",
      render: (count) => (
        <Badge
          count={count}
          style={{ backgroundColor: "#fa8c16" }}
          showZero
        />
      ),
    },
    {
      title: "Bài viết đã bình luận",
      dataIndex: "commentedPosts",
      key: "commentedPosts",
      render: (posts) => (
        <Tooltip
          title={
            <div>
              {posts.map((post, index) => (
                <div key={index}>{post.title}</div>
              ))}
            </div>
          }
        >
          <Badge
            count={posts.length}
            style={{ backgroundColor: "#722ed1" }}
            showZero
          />
        </Tooltip>
      ),
    },
  ];

  // Bộ lọc trên client-side theo tên người dùng
  const filteredLikersData =
    mostActiveLikersData?.data.filter((item) =>
      item.user.name.toLowerCase().includes(likersSearch.toLowerCase())
    ) || [];

  const filteredCommentersData =
    mostActiveCommentersData?.data.filter((item) =>
      item.user.name.toLowerCase().includes(commentersSearch.toLowerCase())
    ) || [];

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Người dùng tương tác tích cực nhất">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <LikeOutlined /> Người dùng like nhiều nhất
                  </span>
                }
                key="1"
              >
                <Search
                  placeholder="Tìm theo tên người dùng"
                  onChange={(e) => setLikersSearch(e.target.value)}
                  style={{ marginBottom: 16, maxWidth: 300 }}
                  allowClear
                />
                <Table
                  columns={likersColumns}
                  dataSource={filteredLikersData}
                  rowKey={(record) => record.user._id}
                  loading={likersLoading}
                  pagination={{
                    current: likersPagination.current,
                    pageSize: likersPagination.pageSize,
                    total: filteredLikersData.length,
                    showTotal: (total) => `Tổng cộng ${total} người dùng`,
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                  }}
                  onChange={handleLikersTableChange}
                  locale={{
                    emptyText: likersLoading ? (
                      <div>
                        <LoadingOutlined style={{ marginRight: 8 }} />
                        Đang tải...
                      </div>
                    ) : (
                      "Không có dữ liệu"
                    ),
                  }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CommentOutlined /> Người dùng bình luận nhiều nhất
                  </span>
                }
                key="2"
              >
                <Search
                  placeholder="Tìm theo tên người dùng"
                  onChange={(e) => setCommentersSearch(e.target.value)}
                  style={{ marginBottom: 16, maxWidth: 300 }}
                  allowClear
                />
                <Table
                  columns={commentersColumns}
                  dataSource={filteredCommentersData}
                  rowKey={(record) => record.user._id}
                  loading={commentersLoading}
                  pagination={{
                    current: commentersPagination.current,
                    pageSize: commentersPagination.pageSize,
                    total: filteredCommentersData.length,
                    showTotal: (total) => `Tổng cộng ${total} người dùng`,
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                  }}
                  onChange={handleCommentersTableChange}
                  locale={{
                    emptyText: commentersLoading ? (
                      <div>
                        <LoadingOutlined style={{ marginRight: 8 }} />
                        Đang tải...
                      </div>
                    ) : (
                      "Không có dữ liệu"
                    ),
                  }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
