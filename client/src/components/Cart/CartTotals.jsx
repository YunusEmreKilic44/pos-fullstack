import { Button } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const CartTotals = () => {
  return (
    <div className="cart h-[calc(100vh-90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/8e46/live/82d73790-5271-11f0-a2ff-17a82c2e8bc4.jpg.webp"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Elma</b>
              <span>12₺ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<PlusCircleOutlined />}
            />
            <span>2</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/8e46/live/82d73790-5271-11f0-a2ff-17a82c2e8bc4.jpg.webp"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Elma</b>
              <span>12₺ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<PlusCircleOutlined />}
            />
            <span>2</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
        <li className="cart-item flex justify-between">
          <div className="flex items-center">
            <img
              src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/8e46/live/82d73790-5271-11f0-a2ff-17a82c2e8bc4.jpg.webp"
              alt=""
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col ml-2">
              <b>Elma</b>
              <span>12₺ x 2</span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<PlusCircleOutlined />}
            />
            <span>2</span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center rounded-full!"
              icon={<MinusCircleOutlined />}
            />
          </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+7.92₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">99₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            danger={true}
            icon={<ClearOutlined />}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
