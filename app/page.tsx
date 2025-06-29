"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    roll: "",
    name: "",
    gender: "",
    mail: "",
    boarding: "",
    feesDetails: "",
    feesAmount: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Required";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">Student Fee Submission</h1>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Roll Number*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.roll && "border-red-400"}`}
              name="roll"
              value={form.roll}
              onChange={handleChange}
              placeholder="Enter Roll Number"
            />
            {errors.roll && <span className="text-xs text-red-500">{errors.roll}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.name && "border-red-400"}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.gender && "border-red-400"}`}
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <span className="text-xs text-red-500">{errors.gender}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mail ID*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.mail && "border-red-400"}`}
              name="mail"
              type="email"
              value={form.mail}
              onChange={handleChange}
              placeholder="Enter Mail ID"
            />
            {errors.mail && <span className="text-xs text-red-500">{errors.mail}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Boarding Point*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.boarding && "border-red-400"}`}
              name="boarding"
              value={form.boarding}
              onChange={handleChange}
              placeholder="Enter Boarding Point"
            />
            {errors.boarding && <span className="text-xs text-red-500">{errors.boarding}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fees Details*</label>
            <select
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.feesDetails && "border-red-400"}`}
              name="feesDetails"
              value={form.feesDetails}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Half Paid</option>
              <option>Fully Paid</option>
            </select>
            {errors.feesDetails && <span className="text-xs text-red-500">{errors.feesDetails}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fees Amount*</label>
            <input
              className={`w-full border rounded px-3 py-2 focus:outline-indigo-400 ${errors.feesAmount && "border-red-400"}`}
              name="feesAmount"
              type="number"
              value={form.feesAmount}
              onChange={handleChange}
              placeholder="Enter Fees Amount"
            />
            {errors.feesAmount && <span className="text-xs text-red-500">{errors.feesAmount}</span>}
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}