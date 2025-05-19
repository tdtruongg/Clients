import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Space,
  Typography,
  message,
  Spin,
  Upload,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { SaveOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import categoryApi from "../../../api/categoryApi";
import postApi from "../../../api/postApi";
import uploadApi from "../../../api/uploadApi";
import SunEditorFormItem from "../../../components/SunEditorFormItem";

const { Title } = Typography;
const { TextArea } = Input;

const PostForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!id;
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories-select"],
    queryFn: () => categoryApi.getCategories({ limit: 100 }),
  });

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => postApi.getPostById(id),
    enabled: isEditing,
  });

  const createPostMutation = useMutation({
    mutationFn: (data) => postApi.createPost(data),
    onSuccess: () => {
      message.success("Thêm mới bài viết thành công");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/admin/blogs");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Thêm mới bài viết thất bại"
      );
      setIsSubmitting(false);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }) => postApi.updatePost(id, data),
    onSuccess: () => {
      message.success("Cập nhật bài viết thành công");
      navigate("/admin/blogs");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Cập nhật bài viết thất bại"
      );
      setIsSubmitting(false);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: (file) => uploadApi.uploadImage(file),
    onSuccess: (secureUrl) => {
      setThumbnailUrl(secureUrl);
      message.success("Tải ảnh thumbnail lên thành công");
      setUploadingThumbnail(false);
    },
    onError: (error) => {
      message.error(error.message || "Tải ảnh thumbnail lên thất bại");
      setUploadingThumbnail(false);
    },
  });

  useEffect(() => {
    if (isEditing && postData) {
      form.setFieldsValue({
        title: postData.title,
        description: postData.description,
        content: postData.content,
        category: postData.category._id,
        tags: postData.tags || [],
      });

      if (postData.thumbnail) {
        setThumbnailPreview(postData.thumbnail);
        setThumbnailUrl(postData.thumbnail);
      }
    }
  }, [isEditing, postData, form]);

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    const postData = {
      ...values,
      thumbnail: thumbnailUrl,
    };

    if (isEditing) {
      updatePostMutation.mutate({
        id,
        data: postData,
      });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };

  if ((isEditing && isPostLoading) || isCategoriesLoading) {
    return (
      <div className="flex justify-center items-center h-full my-16">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div>
      <Card
        title={
          <div className="flex items-center">
            <Title level={4} className="mb-0">
              {isEditing ? "Sửa bài viết" : "Thêm bài viết mới"}
            </Title>
          </div>
        }
        bordered={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="max-w-4xl mx-auto"
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết" },
            ]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" size="large" />
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[
              {
                required: isEditing && thumbnailUrl ? false : true,
                message: "Vui lòng tải lên ảnh thumbnail cho bài viết",
              },
            ]}
          >
            <div className="space-y-2">
              <Upload
                accept="image/*"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setThumbnailPreview(reader.result);
                  };
                  reader.readAsDataURL(file);

                  setUploadingThumbnail(true);
                  uploadImageMutation.mutate(file);

                  return false;
                }}
              >
                {thumbnailUrl || thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailUrl || thumbnailPreview}
                      alt="thumbnail"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {uploadingThumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <LoadingOutlined
                          style={{ fontSize: 24, color: "white" }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {uploadingThumbnail ? (
                      <LoadingOutlined />
                    ) : (
                      <PlusOutlined />
                    )}
                    <div style={{ marginTop: 8 }}>
                      {uploadingThumbnail
                        ? "Đang tải ảnh lên..."
                        : "Tải ảnh lên"}
                    </div>
                  </div>
                )}
              </Upload>
              {thumbnailUrl && (
                <div className="flex items-center">
                  <Button
                    danger
                    size="small"
                    onClick={() => {
                      setThumbnailUrl("");
                      setThumbnailPreview(null);
                      form.setFieldsValue({ thumbnail: undefined });
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả ngắn"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn" }]}
          >
            <TextArea
              placeholder="Nhập mô tả ngắn về bài viết"
              autoSize={{ minRows: 3, maxRows: 5 }}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục" size="large">
              {categoriesData?.data?.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="Thẻ"
            rules={[
              { required: true, message: "Vui lòng nhập ít nhất một thẻ" },
            ]}
          >
            <Select
              mode="tags"
              placeholder="Nhập thẻ và nhấn Enter"
              tokenSeparators={[","]}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài viết" },
            ]}
          >
            <SunEditorFormItem placeholder="Nội dung bài viết" height="400" />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Space>
              <Button size="large" onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SaveOutlined />}
                loading={isSubmitting}
                disabled={uploadingThumbnail}
              >
                {isEditing ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostForm;
