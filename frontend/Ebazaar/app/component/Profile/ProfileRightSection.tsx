import Image from "next/image";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUser } from "@/app/eb/layout";
import { toast, Toaster } from "react-hot-toast";
import { MdOutlineOpenInFull } from "react-icons/md";
import StoreSection from "./StoreSection";
import { useConfirm } from "../ui/ConfirmModal";
import { useAlert } from "../ui/AlertModal";

function ProductCreateModal({
  isOpen,
  onClose,
  onCreate,
  loading,
  error,
}: any) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    imageUrl: "",
    price: "",
    category: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/40 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative bg-overlay">
        <h2 className="text-lg font-bold mb-4">Create Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded p-2"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded p-2"
            required
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border rounded p-2"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border rounded p-2"
            required
          />
          {/* <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded p-2"
            required
          /> */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="">Select Category</option>
            <option value="carpet">Carpet</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="handmade">Handmade</option>
            <option value="home-decor">Home Decor</option>
            <option value="jewelry">Jewelry</option>
            <option value="art">Art</option>
            <option value="books">Books</option>
            <option value="food">Food & Beverages</option>
            <option value="beauty">Beauty & Personal Care</option>
            <option value="services">Services</option>
            <option value="toys">Toys & Games</option>
            <option value="furniture">Furniture</option>
            <option value="pets">Pet Supplies</option>
          </select>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border rounded p-2 bg-white"
          >
            <option value="">Select Location</option>
            <option value="Rabat, Morocco">Rabat, Morocco</option>
            <option value="Casablanca, Morocco">Casablanca, Morocco</option>
            <option value="Marrakech, Morocco">Marrakech, Morocco</option>
            <option value="Fez, Morocco">Fez, Morocco</option>
            <option value="Tangier, Morocco">Tangier, Morocco</option>
            <option value="Agadir, Morocco">Agadir, Morocco</option>
            <option value="Meknes, Morocco">Meknes, Morocco</option>
            <option value="Oujda, Morocco">Oujda, Morocco</option>
            <option value="Kenitra, Morocco">Kenitra, Morocco</option>
            <option value="Tetouan, Morocco">Tetouan, Morocco</option>
            <option value="Safi, Morocco">Safi, Morocco</option>
            <option value="El Jadida, Morocco">El Jadida, Morocco</option>
            <option value="Beni Mellal, Morocco">Beni Mellal, Morocco</option>
            <option value="Errachidia, Morocco">Errachidia, Morocco</option>
            <option value="Taza, Morocco">Taza, Morocco</option>
            <option value="Essaouira, Morocco">Essaouira, Morocco</option>
            <option value="Khouribga, Morocco">Khouribga, Morocco</option>
            <option value="Settat, Morocco">Settat, Morocco</option>
            <option value="Larache, Morocco">Larache, Morocco</option>
            <option value="Khenifra, Morocco">Khenifra, Morocco</option>
            <option value="Guelmim, Morocco">Guelmim, Morocco</option>
            <option value="Nador, Morocco">Nador, Morocco</option>
            <option value="Berrechid, Morocco">Berrechid, Morocco</option>
            <option value="Taourirt, Morocco">Taourirt, Morocco</option>
            <option value="Online">Online Store</option>
            <option value="Other">Other</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="cursor-pointer px-4 py-1 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-1 rounded bg-[#015B46] text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductEditModal({
  isOpen,
  onClose,
  onUpdate,
  loading,
  error,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (form: any) => void;
  loading: boolean;
  error: string;
  product: any;
}) {
  const [form, setForm] = useState({
    title: product?.title || "",
    content: product?.content || "",
    imageUrl: product?.imageUrl || "",
    price: product?.price || "",
    category: product?.category || "",
    location: product?.location || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
  };

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        content: product.content || "",
        imageUrl: product.imageUrl || "",
        price: product.price || "",
        category: product.category || "",
        location: product.location || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/40 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative bg-overlay">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded p-2"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded p-2"
            required
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border rounded p-2"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border rounded p-2"
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded p-2"
            required
          />
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border rounded p-2 bg-white"
          >
            <option value="">Select Location</option>
            <option value="Rabat, Morocco">Rabat, Morocco</option>
            <option value="Casablanca, Morocco">Casablanca, Morocco</option>
            <option value="Marrakech, Morocco">Marrakech, Morocco</option>
            <option value="Fez, Morocco">Fez, Morocco</option>
            <option value="Tangier, Morocco">Tangier, Morocco</option>
            <option value="Agadir, Morocco">Agadir, Morocco</option>
            <option value="Meknes, Morocco">Meknes, Morocco</option>
            <option value="Oujda, Morocco">Oujda, Morocco</option>
            <option value="Kenitra, Morocco">Kenitra, Morocco</option>
            <option value="Tetouan, Morocco">Tetouan, Morocco</option>
            <option value="Safi, Morocco">Safi, Morocco</option>
            <option value="El Jadida, Morocco">El Jadida, Morocco</option>
            <option value="Beni Mellal, Morocco">Beni Mellal, Morocco</option>
            <option value="Errachidia, Morocco">Errachidia, Morocco</option>
            <option value="Taza, Morocco">Taza, Morocco</option>
            <option value="Essaouira, Morocco">Essaouira, Morocco</option>
            <option value="Khouribga, Morocco">Khouribga, Morocco</option>
            <option value="Settat, Morocco">Settat, Morocco</option>
            <option value="Larache, Morocco">Larache, Morocco</option>
            <option value="Khenifra, Morocco">Khenifra, Morocco</option>
            <option value="Guelmim, Morocco">Guelmim, Morocco</option>
            <option value="Nador, Morocco">Nador, Morocco</option>
            <option value="Berrechid, Morocco">Berrechid, Morocco</option>
            <option value="Taourirt, Morocco">Taourirt, Morocco</option>
            <option value="Online">Online Store</option>
            <option value="Other">Other</option>
          </select>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 justify-end mt-2">
            <button
              type="button"
              className="cursor-pointer px-4 py-1 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-1 rounded bg-[#015B46] text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfileRightSection({
  products,
  productsLoading,
  productsError,
  setEditOpen,
  fetchProducts,
}: any) {
  const { confirm, ConfirmModal } = useConfirm();
  const { alert, AlertModal } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalLoading, setEditModalLoading] = useState(false);
  const [editModalError, setEditModalError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCreateProduct = async (form: any) => {
    setModalLoading(true);
    setModalError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setModalError(data.error || "Failed to create product");
      } else {
        setModalOpen(false);
        if (fetchProducts) fetchProducts();
      }
    } catch (err) {
      setModalError("Failed to create product");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    const confirmed = await confirm({
      title: "Delete Product",
      message:
        "Are you sure you want to delete this product? This action cannot be undone.",
      type: "danger",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error("Failed to delete product");
      } else {
        toast.success("Product deleted successfully");
        if (fetchProducts) fetchProducts();
      }
    } catch (err) {
      alert({
        title: "Error",
        message: "Failed to delete product",
        type: "error",
      });
    }
  };
  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleUpdateProduct = async (form: any) => {
    if (!selectedProduct) return;

    // Check if any changes were made
    const hasChanges =
      form.title !== selectedProduct.title ||
      form.content !== selectedProduct.content ||
      form.imageUrl !== selectedProduct.imageUrl ||
      Number(form.price) !== Number(selectedProduct.price) ||
      form.category !== selectedProduct.category ||
      form.location !== selectedProduct.location;

    if (!hasChanges) {
      toast.success("No changes detected");
      return;
    }

    setEditModalLoading(true);
    setEditModalError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${selectedProduct.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setEditModalError(data.error || "Failed to update product");
      } else {
        setEditModalOpen(false);
        setSelectedProduct(null);
        if (fetchProducts) fetchProducts();
        toast.success("Product updated successfully");
      }
    } catch (err) {
      setEditModalError("Failed to update product");
    } finally {
      setEditModalLoading(false);
    }
  };
  const [hasStore, sethasStore] = useState<boolean>(false);
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/store/status`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          sethasStore(data.hasStore);
          console.log("has store, ", data.hasStore);
        } else {
          sethasStore(false);
        }
      } catch (err) {
        console.error("Error fetching store status:", err);
        sethasStore(false);
      }
    };

    fetchStoreStatus();
  }, []);
  return (
    <div className="flex-1 flex flex-col gap-6 pt-6 min-w-0 overflow-auto">
      {/* Store Section */}
      <StoreSection />

      {/* Products Section */}
      <div className="bg-white relative bg-overlay rounded-2xl shadow p-3 sm:p-6 border border-gray-200 flex flex-col gap-5 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Products
          </h2>
          <button
            className={`${
              !hasStore && "pointer-events-none grayscale-75 opacity-30"
            }  cursor-pointer px-3 sm:px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors`}
            onClick={() => setModalOpen(true)}
          >
            Create product
          </button>
        </div>
        {productsLoading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : productsError ? (
          <p className="text-center text-gray-600">{productsError}</p>
        ) : !products || products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6">
            <h3 className="text-xl font-bold mb-4">No Products Yet</h3>
            <p className="text-gray-600 mb-4 text-center">
              You haven't added any products yet. Create one to start selling!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="bg-white relative bg-overlay rounded-2xl shadow p-3 sm:p-4 border border-gray-200 flex flex-col"
              >
                <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.imageUrl || "/Background.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 px-3 bg-[#A44A3F] text-white text-xs  py-0.5 rounded font-semibold">
                    {product.category}
                  </span>
                  <button
                    title="Delete product"
                    className="cursor-pointer absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-[#fff]/80 transition-colors border border-gray-200"
                    style={{ zIndex: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                  >
                    <FaTrash className="text-[#A44A3F]  text-base" />
                  </button>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs lg:text-sm sm:text-base font-bold text-[#13120F] mb-1">
                    {product.title}
                  </h3>
                  <div className="cursor-pointer flex items-center justify-center w-6 h-6 rounded  bg-[#015B46] hover:bg-[#013f3a] transition-colors">
                    <MdOutlineOpenInFull color="white" size={13} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <FaMapMarkerAlt className="text-base" />
                  <span>{product.location}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-full bg-gray-200 rounded text-center py-1">
                    <span className="text-base lg:text-lg font-bold text-[#13120F] ">
                      ${product.price}
                    </span>
                  </div>
                  <button
                    className="cursor-pointer w-full py-1 text-base lg:text-lg bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster position="top-right" />
      <ProductCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateProduct}
        loading={modalLoading}
        error={modalError}
      />
      <ProductEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
          setEditModalError("");
        }}
        onUpdate={handleUpdateProduct}
        product={selectedProduct}
        loading={editModalLoading}
        error={editModalError}
      />
      <ConfirmModal />
      <AlertModal />
    </div>
  );
}
