import { Button, Form, Input, Modal, Select, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/add-product`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          title: values.title,
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      closable={{ "aria-label": "Custom Close Button" }}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name={"title"}
          label="Ürün Ekle"
          rules={[
            { required: true, message: "Ürün adı alanı boş bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name={"img"}
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün görseli alanı boş bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün görseli giriniz." />
        </Form.Item>
        <Form.Item
          name={"price"}
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün fiyatı alanı boş bırakılamaz!" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name={"category"}
          label="Ürün Kategorisi"
          rules={[
            { required: true, message: "Ürün fiyatı alanı boş bırakılamaz!" },
          ]}
        >
          <Select
            showSearch={{
              optionFilterProp: "label",
              filterSort: (optionA, optionB) =>
                (optionA?.titel ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase()),
            }}
            placeholder="Search to Select"
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
