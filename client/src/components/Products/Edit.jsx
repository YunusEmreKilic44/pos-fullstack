import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingItem, setEditingItem] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/get-all`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/categories/get-all`);
        const data = await res.json();
        data &&
          setCategories(data.map((item) => ({ ...item, value: item.title })));
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    form.setFieldsValue(editingItem);
  }, [editingItem, form]);

  const onFinish = (values) => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/update-product`, {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) => (item._id === editingItem._id ? values : item)),
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti");
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    if (confirm("Emin misiniz?")) {
      try {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/delete-product`, {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti!");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return <img src={record.img} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "adtion",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Düzenle
            </Button>

            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
              {
                required: true,
                message: "Ürün görseli alanı boş bırakılamaz!",
              },
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
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
