import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useUser } from "@/app/eb/layout";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { useConfirm } from "../ui/ConfirmModal";

interface Store {
  id: number;
  name: string;
  description: string;
  logo?: string;
  cover?: string;
  location?: string;
}

function StoreCreateModal({
  isOpen,
  onClose,
  onCreate,
  loading,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (form: any) => void;
  loading: boolean;
  error: string;
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: "",
    cover: "",
    location: "",
  });

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm({ ...form, [name]: file });
    } else {
      setForm({ ...form, [name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/40">
      <div className="bg-white relative bg-overlay rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Create Store</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Store Name"
            className="border rounded p-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Store Description"
            className="border rounded p-2"
            required
          />
          <input
            // type="file"
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="border rounded p-2"
          />
          <input
            // type="file"
            name="cover"
            value={form.cover}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="border rounded p-2"
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
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StoreEditModal({
  isOpen,
  onClose,
  onUpdate,
  loading,
  error,
  store,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (form: any) => void;
  loading: boolean;
  error: string;
  store: Store;
}) {
  const [form, setForm] = useState({
    name: store?.name || "",
    description: store?.description || "",
    logo: store?.logo || "",
    cover: store?.cover || "",
    location: store?.location || "",
  });

  useEffect(() => {
    if (store) {
      setForm({
        name: store.name || "",
        description: store.description || "",
        logo: store.logo || "",
        cover: store.cover || "",
        location: store.location || "",
      });
    }
  }, [store]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111]/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Store</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Store Name"
            className="border rounded p-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Store Description"
            className="border rounded p-2"
            required
          />
          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="Logo URL"
            className="border rounded p-2"
          />
          <input
            name="cover"
            value={form.cover}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="border rounded p-2"
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

export default function StoreSection() {
  const { confirm, ConfirmModal } = useConfirm();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  const data = useUser();
  const user = data?.user;

  const fetchStore = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/me`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          setStore(null);
        } else {
          throw new Error(data.error || "Failed to fetch store");
        }
      } else {
        setStore(data.store);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch store");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleCreateStore = async (form: any) => {
    setModalLoading(true);
    setModalError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stores`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      if (!res.ok) {
        setModalError(data.error || "Failed to create store");
      } else {
        setCreateModalOpen(false);
        toast.success("Store created successfully");
        window.location.reload();
      }
    } catch (err) {
      setModalError("Failed to create store");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateStore = async (form: any) => {
    if (!store) return;
    setModalLoading(true);
    setModalError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/${store.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setModalError(data.error || "Failed to update store");
      } else {
        setEditModalOpen(false);
        toast.success("Store updated successfully");
        fetchStore();
      }
    } catch (err) {
      setModalError("Failed to update store");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    if (!store) return;

    const confirmed = await confirm({
      title: "Delete Store",
      message:
        "Are you sure you want to delete this store? This action cannot be undone.",
      type: "danger",
      confirmText: "Delete Store",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stores/${store.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to delete store");
      } else {
        toast.success("Store deleted successfully");
        window.location.reload();
        setStore(null);
      }
    } catch (err) {
      toast.error("Failed to delete store");
    }
  };

  if (loading) {
    return <div className="text-center">Loading store...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-between p-6 bg-white rounded-2xl shadow ">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">Create Your Ebazaar</h2>
          <button
            onClick={() => {
              setCreateModalOpen(true);
            }}
            className="cursor-pointer px-4 py-2 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors"
          >
            Create Ebazaar
          </button>
        </div>
        <p className="text-gray-600 mb-4">
          You don't have a Ebazaar yet. Create one to start selling!
        </p>
        <StoreCreateModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onCreate={handleCreateStore}
          loading={modalLoading}
          error={modalError}
        />
      </div>
    );
  }

  return (
    <div className="bg-white relative rounded-4xl shadow border border-gray-200 mb-2 w-full">
      <div className="w-full h-32 sm:h-48 rounded-t-2xl overflow-hidden relative">
        <Image
          src={store.cover || "/Background.jpg"}
          alt="Store Cover"
          width={900}
          height={144}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col p-3 sm:p-6 gap-4 sm:gap-6">
        <div className="flex flex-col 2xl:flex-row items-start 2xl:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={store.logo} className="w-12 h-12 rounded-full" />
            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
              {store.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="cursor-pointer px-3 sm:px-4 py-1 bg-[#015B46] text-white rounded font-semibold hover:bg-[#013f3a] transition-colors"
            >
              Edit Store
            </button>
            <button
              onClick={handleDeleteStore}
              className="cursor-pointer px-3 sm:px-4 py-1 bg-[#A44A3F] text-white rounded font-semibold hover:bg-[#8a3e36] transition-colors"
            >
              Delete Store
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-lg">{store.description}</p>
        {store.location && (
          <div className="flex items-center gap-2 text-gray-500">
            <FaMapMarkerAlt />
            <span>{store.location}</span>
          </div>
        )}
      </div>
      <StoreEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleUpdateStore}
        loading={modalLoading}
        error={modalError}
        store={store}
      />
      <ConfirmModal />
    </div>
  );
}
