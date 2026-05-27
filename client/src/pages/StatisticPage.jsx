import { useEffect, useMemo, useState } from "react";
import { Area, Pie } from "@ant-design/charts";
import Header from "../components/Header/Header";
import StatisticCard from "../components/Statistics/StatisticCard";

const StatisticPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("popUser"));

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/bills/get-all`);
        const data = await res.json();
        setBills(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBills();
  }, []);

  const statistics = useMemo(() => {
    const uniqueCustomers = new Set();
    const dailySales = {};
    const customerSales = {};

    const totalIncome = bills.reduce((total, bill) => {
      const amount = Number(bill.totalAmount) || 0;
      const customerKey = bill.customerPhoneNumber || bill.customerName;
      const date = bill.createdAt?.substring(0, 10) || "Tarihsiz";

      if (customerKey) {
        uniqueCustomers.add(customerKey);
      }

      dailySales[date] = (dailySales[date] || 0) + amount;
      customerSales[bill.customerName || "Bilinmeyen"] =
        (customerSales[bill.customerName || "Bilinmeyen"] || 0) + amount;

      return total + amount;
    }, 0);

    const totalProducts = bills.reduce((total, bill) => {
      return (
        total +
        (bill.cartItems || []).reduce((itemTotal, item) => {
          return itemTotal + (Number(item.quantity) || 1);
        }, 0)
      );
    }, 0);

    return {
      totalCustomers: uniqueCustomers.size,
      totalIncome,
      totalSales: bills.length,
      totalProducts,
      dailySales: Object.entries(dailySales)
        .map(([date, totalAmount]) => ({
          date,
          totalAmount: Number(totalAmount.toFixed(2)),
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      customerSales: Object.entries(customerSales).map(
        ([customerName, totalAmount]) => ({
          customerName,
          totalAmount: Number(totalAmount.toFixed(2)),
        }),
      ),
    };
  }, [bills]);

  const areaConfig = {
    autoFit: true,
    height: 288,
    data: statistics.dailySales,
    xField: "date",
    yField: "totalAmount",
    axis: {
      y: {
        labelFormatter: (value) => `${value} TL`,
      },
    },
  };

  const pieConfig = {
    autoFit: true,
    height: 288,
    data: statistics.customerSales,
    angleField: "totalAmount",
    colorField: "customerName",
    innerRadius: 0.6,
    label: {
      text: "totalAmount",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Müşteri\nKazancı",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="px-6 pb-20 md:pb-0">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">
              {user.username}
            </span>
            .
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={loading ? "..." : statistics.totalCustomers}
              img="images/user.png"
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={
                loading ? "..." : `${statistics.totalIncome.toFixed(2)} ₺`
              }
              img="images/money.png"
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={loading ? "..." : statistics.totalSales}
              img="images/sale.png"
            />
            <StatisticCard
              title={"Satılan Ürün"}
              amount={loading ? "..." : statistics.totalProducts}
              img="images/product.png"
            />
          </div>
          <div className="grid w-full min-w-0 grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="h-72 w-full min-w-0">
              <Area {...areaConfig} />
            </div>
            <div className="h-72 w-full min-w-0">
              <Pie {...pieConfig} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
