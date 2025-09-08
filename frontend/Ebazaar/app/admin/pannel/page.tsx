"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiBox,
  FiRefreshCw,
  FiSearch,
  FiAlertTriangle,
  FiShield,
  FiDownload,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

// Single-file Admin Panel component
// - Fetches /users (expects { users: User[], products?: Product[] })
// - Shows overview cards, searchable tables, and per-user product drilldown
// - Works with cookie-based auth; optionally reads a token from localStorage for Authorization header
// - Tailwind-only styling

// ---- Types ----
interface UserRow {
  id: number;
  email: string;
  name: string;
  role: string; // "admin" | "user" | etc.
  profileImage?: string;
  username?: string;
  location?: string;
  verified?: boolean;
  isOnline?: boolean;
  phone?: string;
  language?: string;
  created_at?: string;
}

interface ProductRow {
  id: number;
  userId?: number | null; // if present, product owner
  title?: string;
  name?: string;
  price?: number | string | null;
  status?: string | null;
  createdAt?: string | null;
}

interface ApiResponse {
  users: UserRow[];
  products?: ProductRow[];
  message?: string;
}

export default function AdminPanel() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qUsers, setQUsers] = useState("");
  const [qProducts, setQProducts] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  // ---- Fetch ----
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/users`,
        {
          method: "GET",
          credentials: "include", // send cookies if token is cookie-based
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText} — ${text}`);
      }

      const json = (await res.json()) as ApiResponse;
      setData({
        users: json.users ?? [],
        products: json.products ?? [],
        message: json.message,
      });
    } catch (e: any) {
      setError(e?.message || "Failed to load data");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Derived ----
  const productsByUser = useMemo(() => {
    const map = new Map<number, ProductRow[]>();
    const products = data?.products ?? [];
    for (const p of products) {
      const uid =
        (p as any).userId ?? (p as any).ownerId ?? (p as any).user_id ?? null;
      if (typeof uid === "number") {
        if (!map.has(uid)) map.set(uid, []);
        map.get(uid)!.push(p);
      }
    }
    return map;
  }, [data]);

  const filteredUsers = useMemo(() => {
    const users = data?.users ?? [];
    if (!qUsers.trim()) return users;
    const q = qUsers.toLowerCase();
    return users.filter((u) =>
      [u.name, u.email, String(u.id), u.role].some((v) =>
        (v ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, qUsers]);

  const filteredProducts = useMemo(() => {
    const products = data?.products ?? [];
    if (!qProducts.trim()) return products;
    const q = qProducts.toLowerCase();
    return products.filter((p) =>
      [p.title, p.name, String(p.id), String(p.userId), p.status]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [data, qProducts]);

  // ---- Helpers ----
  function roleBadge(role: string) {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-medium";
    const map: Record<string, string> = {
      admin: "bg-[#015B46] text-white",
      user: "bg-gray-200 text-gray-800",
      manager: "bg-blue-100 text-blue-800",
      seller: "bg-[#A44A3F] text-white",
    };
    return (
      <span className={`${base} ${map[role] ?? "bg-gray-100 text-gray-800"}`}>
        {role}
      </span>
    );
  }

  function money(x: any) {
    const n = typeof x === "number" ? x : Number(x ?? 0);
    if (Number.isNaN(n)) return "—";
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  }

  function exportCsv() {
    const users = data?.users ?? [];
    const products = data?.products ?? [];
    const csvRows: string[] = [];
    csvRows.push("Users");
    csvRows.push(["id", "name", "email", "role"].join(","));
    for (const u of users)
      csvRows.push([u.id, wrap(u.name), wrap(u.email), wrap(u.role)].join(","));
    csvRows.push("");
    csvRows.push("Products");
    const headers = [
      "id",
      "userId",
      "title",
      "name",
      "price",
      "status",
      "createdAt",
    ];
    csvRows.push(headers.join(","));
    for (const p of products)
      csvRows.push(headers.map((h) => wrap((p as any)[h])).join(","));
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${new Date().toISOString().slice(0, 19)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    function wrap(v: any) {
      if (v == null) return "";
      const s = String(v).replaceAll('"', '""');
      return s.includes(",") || s.includes("\n") ? `"${s}"` : s;
    }
  }

  // Delete user helper
  async function deleteUser(id: number) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    setError(null);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete user");
      }
      toast(data.message || "User deleted");
      load();
    } catch (e: any) {
      setError(e?.message || "Failed to delete user");
      toast(e?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F7F8] text-[#13120F]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#015B46]" />
            <h1 className="text-xl sm:text-2xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#015B46] text-white hover:bg-[#014a39] transition"
            >
              <FiRefreshCw /> Refresh
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-black transition"
            >
              <FiDownload /> Export CSV
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#015B46] text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm opacity-90">Total Users</h3>
              <FiUsers />
            </div>
            <p className="text-4xl font-bold mt-2">
              {data?.users?.length ?? 0}
            </p>
            <p className="text-xs opacity-80 mt-1">Admins included</p>
          </div>
          <div className="bg-gray-700 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm opacity-90">Total Products</h3>
              <FiBox />
            </div>
            <p className="text-4xl font-bold mt-2">
              {data?.products?.length ?? 0}
            </p>
            <p className="text-xs opacity-80 mt-1">Across all users</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm text-gray-500">API Message</h3>
            <p className="mt-2 font-medium truncate">{data?.message ?? "—"}</p>
            <p className="text-xs text-gray-500 mt-1">GET /users</p>
          </div>
        </section>

        {/* Errors / Loading */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-start gap-3">
            <FiAlertTriangle className="mt-0.5" />
            <div>
              <p className="font-semibold">Could not load data</p>
              <p className="text-sm break-all">{error}</p>
            </div>
          </div>
        )}
        {loading && (
          <div className="mb-6 p-4 rounded-xl bg-white border border-gray-100 animate-pulse">
            Loading…
          </div>
        )}

        {/* Users Table */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Users</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                className="pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#015B46]/30 w-64"
                placeholder="Search users…"
                value={qUsers}
                onChange={(e) => setQUsers(e.target.value)}
              />
            </div>
          </div>

          <div className=" overflow-auto rounded-2xl border border-gray-200 bg-white pb-3 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-200">
            <table className="w-screen text-left">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Profile</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Verified</th>
                  <th className="px-4 py-3">Online</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Language</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Products</th>
                </tr>
              </thead>
              <tbody>
                {(filteredUsers ?? []).map((u) => {
                  const count = productsByUser.get(u.id)?.length ?? 0;
                  const expanded = expandedUserId === u.id;
                  return (
                    <>
                      <tr
                        key={u.id}
                        className="border-t border-gray-100 hover:bg-gray-50/60"
                      >
                        <td className="px-4 py-3 align-top">{u.id}</td>
                        <td className="px-4 py-3 align-top">
                          <img
                            src={u.profileImage || "/EBAZAAR default.png"}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                        </td>
                        <td className="px-4 py-3 align-top font-medium">
                          {u.name}
                        </td>
                        <td className="px-4 py-3 align-top text-gray-600">
                          {u.email}
                        </td>
                        <td className="px-4 py-3 align-top">{u.username}</td>
                        <td className="px-4 py-3 align-top">
                          {roleBadge(u.role)}
                        </td>
                        <td className="px-4 py-3 align-top">
                          {u.location || "—"}
                        </td>
                        <td className="px-4 py-3 align-top">
                          {u.verified ? (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          {u.isOnline ? (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                              Online
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                              Offline
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          {u.phone || "—"}
                        </td>
                        <td className="px-4 py-3 align-top">
                          {u.language || "—"}
                        </td>
                        <td className="px-4 py-3 align-top text-xs text-gray-500">
                          {u.created_at
                            ? new Date(u.created_at).toLocaleString()
                            : "—"}
                        </td>
                        <td className="px-4 py-3 align-top flex gap-2 items-center">
                          <button
                            onClick={() =>
                              setExpandedUserId(expanded ? null : u.id)
                            }
                            className="text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
                          >
                            {count} View
                          </button>
                          {/* Become Seller button: only for users who are not seller or admin */}
                          {u.role !== "seller" && u.role !== "admin" && (
                            <button
                              onClick={async () => {
                                if (!window.confirm(`Make ${u.name} a seller?`))
                                  return;
                                setLoading(true);
                                setError(null);
                                try {
                                  const token =
                                    typeof window !== "undefined"
                                      ? localStorage.getItem("token")
                                      : null;
                                  const res = await fetch(
                                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/become-seller/${u.id}`,
                                    {
                                      method: "PUT",
                                      credentials: "include",
                                    }
                                  );
                                  const data = await res.json();
                                  if (!res.ok) {
                                    throw new Error(
                                      data.error || "Failed to make seller"
                                    );
                                  }
                                  toast(data.message || "User is now a seller");
                                  load();
                                } catch (e: any) {
                                  setError(
                                    e?.message || "Failed to make seller"
                                  );
                                  toast(e?.message || "Failed to make seller");
                                } finally {
                                  setLoading(false);
                                }
                              }}
                              className="cursor-pointer text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                            >
                              Become Seller
                            </button>
                          )}
                          {/* Become User button: only for users who are not user or admin */}
                          {u.role !== "user" && u.role !== "admin" && (
                            <button
                              onClick={async () => {
                                if (!window.confirm(`Make ${u.name} a user?`))
                                  return;
                                setLoading(true);
                                setError(null);
                                try {
                                  const token =
                                    typeof window !== "undefined"
                                      ? localStorage.getItem("token")
                                      : null;
                                  const res = await fetch(
                                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/become-user/${u.id}`,
                                    {
                                      method: "PUT",
                                      credentials: "include",
                                    }
                                  );
                                  const data = await res.json();
                                  if (!res.ok) {
                                    throw new Error(
                                      data.error || "Failed to make user"
                                    );
                                  }
                                  toast(data.message || "User is now a user");
                                  load();
                                } catch (e: any) {
                                  setError(e?.message || "Failed to make user");
                                  toast(e?.message || "Failed to make user");
                                } finally {
                                  setLoading(false);
                                }
                              }}
                              className="cursor-pointer text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              Become User
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(u.id)}
                            className=" cursor-pointer text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="bg-gray-50">
                          <td colSpan={13} className="px-4 py-4">
                            <div className="rounded-xl border border-gray-200 bg-white">
                              <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2">
                                <FiBox /> Products of {u.name}
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                  <thead className="bg-gray-50 text-sm text-gray-600">
                                    <tr>
                                      <th className="px-4 py-3">ID</th>
                                      <th className="px-4 py-3">Title/Name</th>
                                      <th className="px-4 py-3">Price</th>
                                      <th className="px-4 py-3">Status</th>
                                      <th className="px-4 py-3">Created</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(productsByUser.get(u.id) ?? []).map(
                                      (p) => (
                                        <tr
                                          key={p.id}
                                          className="border-t border-gray-100"
                                        >
                                          <td className="px-4 py-3">{p.id}</td>
                                          <td className="px-4 py-3 font-medium">
                                            {p.title ?? p.name ?? "—"}
                                          </td>
                                          <td className="px-4 py-3">
                                            {money(p.price)}
                                          </td>
                                          <td className="px-4 py-3">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                              {p.status ?? "—"}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-gray-500 text-sm">
                                            {p.createdAt
                                              ? new Date(
                                                  p.createdAt
                                                ).toLocaleString()
                                              : "—"}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                    {(!productsByUser.get(u.id) ||
                                      productsByUser.get(u.id)!.length ===
                                        0) && (
                                      <tr>
                                        <td
                                          className="px-4 py-6 text-gray-500 text-sm"
                                          colSpan={5}
                                        >
                                          No products for this user.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-6 text-gray-500 text-sm"
                      colSpan={13}
                    >
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Products Table */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  className="pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#015B46]/30 w-64"
                  placeholder="Search products…"
                  value={qProducts}
                  onChange={(e) => setQProducts(e.target.value)}
                />
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#015B46] text-white">
                <FiShield /> Admin-only view
              </span>
            </div>
          </div>

          <div className="overflow-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Title/Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filteredProducts ?? []).map((p) => {
                  const uid =
                    (p as any).userId ??
                    (p as any).ownerId ??
                    (p as any).user_id ??
                    null;
                  const owner = data?.users?.find((u) => u.id === uid);
                  return (
                    <tr
                      key={`p-${p.id}`}
                      className="border-t border-gray-100 hover:bg-gray-50/60"
                    >
                      <td className="px-4 py-3">{p.id}</td>
                      <td className="px-4 py-3">
                        {owner ? (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{owner.name}</span>
                            <span className="text-xs text-gray-500">
                              #{owner.id}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {p.title ?? p.name ?? "—"}
                      </td>
                      <td className="px-4 py-3">{money(p.price)}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                          {p.status ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to delete this product?"
                              )
                            )
                              return;
                            setLoading(true);
                            setError(null);
                            try {
                              const token =
                                typeof window !== "undefined"
                                  ? localStorage.getItem("token")
                                  : null;
                              const res = await fetch(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${p.id}`,
                                {
                                  method: "DELETE",
                                  credentials: "include",
                                  headers: token
                                    ? { Authorization: `Bearer ${token}` }
                                    : undefined,
                                }
                              );
                              const data = await res.json();
                              if (!res.ok) {
                                throw new Error(
                                  data.error || "Failed to delete product"
                                );
                              }
                              toast(data.message || "Product deleted");
                              load();
                            } catch (e: any) {
                              setError(
                                e?.message || "Failed to delete product"
                              );
                              toast(e?.message || "Failed to delete product");
                            } finally {
                              setLoading(false);
                            }
                          }}
                          className="cursor-pointer text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-gray-500 text-sm" colSpan={6}>
                      No products match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-xs text-gray-500">
        Built with ❤ — By Aimen Taoussi
      </footer>
    </div>
  );
}
