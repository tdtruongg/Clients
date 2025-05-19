import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  editingCategory,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name: editingCategory.name,
      });
    } else {
      form.resetFields();
    }
  }, [editingCategory, form, open]);

  const handleSubmit = (values) => {
    onSubmit(values);
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
        <Form.Item className="mb-0 text-right">
          <Button
            onClick={onClose}
            style={{ marginRight: 8 }}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {editingCategory ? "Lưu" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
