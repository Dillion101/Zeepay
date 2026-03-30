"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApplications } from "@/context/ApplicationContext";
import type { NewApplication, ApplicationStatus } from "@/types";

const statusOptions: ApplicationStatus[] = [
  "Pending",
  "Interview",
  "Rejected",
  "Offer",
];

const emptyForm: NewApplication = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  jobLink: "",
  status: "Pending",
};

type FormErrors = Partial<Record<keyof NewApplication, string>>;

export default function AddApplicationPage() {
  const { addApplication } = useApplications();
  const router = useRouter();

  const [form, setForm] = useState<NewApplication>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!form.company.trim()) newErrors.company = "Company name is required.";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!form.dateApplied) newErrors.dateApplied = "Date applied is required.";
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addApplication(form);
    router.push("/applications");
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-1">Add Application</h1>
      <p className="text-gray-500 text-sm mb-6">Fill in the details below</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5"
      >
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">{errors.company}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Frontend Engineer"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
          )}
        </div>

        {/* Date Applied */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Applied <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateApplied"
            value={form.dateApplied}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateApplied && (
            <p className="text-red-500 text-xs mt-1">{errors.dateApplied}</p>
          )}
        </div>

        {/* Job Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Link
          </label>
          <input
            type="url"
            name="jobLink"
            value={form.jobLink}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Application
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
