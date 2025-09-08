"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    location: user?.location || "",
    language: user?.language || "",
    phone: user?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center "
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white bg-overlay rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-xl font-bold mb-2 text-[#015B46]">
            Edit Profile
          </Dialog.Title>
          <button className="p-2 cursor-pointer" onClick={onClose}>
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password (leave blank to keep current)"
            type="password"
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Password (leave blank to keep current)"
            type="number"
            className="border rounded-lg px-3 py-2"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border rounded-lg px-3 py-2"
          />
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Arabic">Arabic</option>
          </select>
          <button
            type="submit"
            className="cursor-pointer mt-2 bg-[#015B46] text-white rounded-lg py-2 font-semibold hover:bg-[#013f3a] transition-colors"
          >
            Save Changes
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
