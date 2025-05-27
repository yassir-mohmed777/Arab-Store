import { useState } from "react";
import ProductModal from "../Modal/ProductModal";

export default function ProductsManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "منتج 1",
      price: 100,
      description: "وصف المنتج",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 150,
      description: "وصف آخر",
      imageUrl: "https://via.placeholder.com/100",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // or "edit"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (productData) => {
    if (modalMode === "add") {
      const newProduct = {
        id: Date.now(), // وهمي
        ...productData,
      };
      setProducts([...products, newProduct]);
    } else {
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      );
      setProducts(updatedProducts);
    }

    closeModal();
  };

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا المنتج؟"
    );
    if (confirmDelete) {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">إدارة المنتجات</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          + منتج جديد
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 overflow-y-auto h-[500px]">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>الصورة</th>
              <th>الاسم</th>
              <th>السعر</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className="hover:bg-base-200">
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}CAD</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* المودال */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
      />
    </div>
  );
}
