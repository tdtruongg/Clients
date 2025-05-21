import { Modal, Form, Input, Button, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import uploadApi from "../../../api/uploadApi";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  editingCategory,
  loading,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const uploadImageMutation = useMutation({
    mutationFn: (file) => uploadApi.uploadImage(file),
    onSuccess: (secureUrl) => {
      setImageUrl(secureUrl);
      message.success("Tải ảnh lên thành công");
      setUploadingImage(false);
    },
    onError: (error) => {
      message.error(error.message || "Tải ảnh lên thất bại");
      setUploadingImage(false);
    },
  });

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name: editingCategory.name,
      });

      if (editingCategory.image) {
        setImagePreview(editingCategory.image);
        setImageUrl(editingCategory.image);
      } else {
        setImagePreview(null);
        setImageUrl("");
      }
    } else {
      form.resetFields();
      setImagePreview(null);
      setImageUrl("");
    }
  }, [editingCategory, form, open]);

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      image: imageUrl,
    });
  };

  return (
    <Modal
      title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[
            {
              required: true,
              message: "Vui lòng tải lên hình ảnh cho danh mục",
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
                  setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);

                setUploadingImage(true);
                uploadImageMutation.mutate(file);

                return false;
              }}
            >
              {imageUrl || imagePreview ? (
                <div className="relative">
                  <img
                    src={imageUrl || imagePreview}
                    alt="category image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {uploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <LoadingOutlined
                        style={{ fontSize: 24, color: "white" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {uploadingImage ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>
                    {uploadingImage ? "Đang tải ảnh lên..." : "Tải ảnh lên"}
                  </div>
                </div>
              )}
            </Upload>
            {imageUrl && (
              <div className="flex items-center">
                <Button
                  danger
                  size="small"
                  onClick={() => {
                    setImageUrl("");
                    setImagePreview(null);
                    form.setFieldsValue({ image: undefined });
                  }}
                >
                  Xóa
                </Button>
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item className="mb-0 text-right">
          <Button
            onClick={onClose}
            style={{ marginRight: 8 }}
            disabled={loading || uploadingImage}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={uploadingImage}
          >
            {editingCategory ? "Lưu" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
