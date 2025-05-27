import { useState } from "react";
import Orders from "../Componants/Orders";

export default function ProfilecustomerPage() {
  // بيانات وهمية مؤقتة
  const userData = {
    full_name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "0123456789",
    address: "القاهرة، مصر",
  };

  const orders = [
    {
      id: 6,
      documentId: "wd10pff944ns77b96io87kkv",
      createdAt: "2025-04-27T01:21:26.046Z",
      updatedAt: "2025-04-27T01:21:26.046Z",
      publishedAt: "2025-04-27T01:21:26.058Z",
      total_price: 790,
      city: "Cario",
      order_code: "ORD-143981",
      address: "almaadi",
      phone: "+201012345676",
      order_status: "تم التوصيل",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 8,
      documentId: "r1nf4jvxvdlbpmyu9rfqbv8h",
      createdAt: "2025-04-27T01:23:02.830Z",
      updatedAt: "2025-04-27T01:23:02.830Z",
      publishedAt: "2025-04-27T01:23:02.840Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-310768",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "تحت التجهيز",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
    {
      id: 10,
      documentId: "laf5gr6t1ycv35sivmwd2407",
      createdAt: "2025-04-27T01:26:46.915Z",
      updatedAt: "2025-04-27T01:26:46.915Z",
      publishedAt: "2025-04-27T01:26:46.928Z",
      total_price: 790,
      city: "alexandra",
      order_code: "ORD-228452",
      address: "soogalgomaa",
      phone: "+201012345676",
      order_status: "pending",
      payment_method: "cod",
      counntry: null,
    },
  ];

  return (
    <div className="container mx-auto min-h-[calc(100vh-90px)] bg-white  rounded">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">معلومات الحساب</h2>
          <p>
            <strong>الاسم الكامل:</strong> {userData.full_name}
          </p>
          <p>
            <strong>البريد الإلكتروني:</strong> {userData.email}
          </p>
          <p>
            <strong>رقم الهاتف:</strong> {userData.phone}
          </p>
          <p>
            <strong>العنوان:</strong> {userData.address}
          </p>
        </div>

        <div className="pt-7">
          <h2 className="text-2xl font-bold mb-2">طلباتي</h2>

          <Orders userOrder={orders} />
        </div>
      </div>
    </div>
  );
}
