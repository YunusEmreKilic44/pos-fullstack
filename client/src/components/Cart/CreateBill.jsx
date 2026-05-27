import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/bills/add-bill`, {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti!");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Müşteri Adı"
          name="customerName"
          rules={[{ required: true, message: "Lütfen müşteri adı girin" }]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız" />
        </Form.Item>
        <Form.Item
          label="Tel No"
          name="customerPhoneNumber"
          rules={[{ required: true, message: "Lütfen telefon numarası girin" }]}
        >
          <Input placeholder="Telefon Numarası" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Ödeme Yöntemi"
          rules={[{ required: true, message: "Lütfen müşteri adı girin" }]}
          name="paymentMode"
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>

        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam</span>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>

          <div className="flex justify-between my-2">
            <span>KDV Toplam %{cart.tax}</span>
            <span className="text-red-600">
              {((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺</b>
          </div>
          <div className="flex justify-end">
            <Button
              type="primary"
              className="mt-4"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Siparişi Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
