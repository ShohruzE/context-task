import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateCourseForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormData({
      title: formData.title.trim(),
      description: formData.description.trim(),
    });
    if (formData.title.length < 2 || formData.description.length < 2) {
      setError("Title and description must be at least 2 characters long");
      return;
    }

    console.log(formData);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error: any) {
      setError("Error: " + error.message);
      return;
    } finally {
      setLoading(false);
      navigate("/courses");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-4"
    >
      <div className="flex flex-col space-y-1 w-full">
        <label htmlFor="title" className="font-semibold text-lg">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-400 p-2 mb-2 rounded-md"
        />
        <p className="text-sm text-gray-600">
          Enter the name of the course you want to be created.
        </p>
      </div>
      <div className="flex flex-col space-y-1 w-full">
        <label htmlFor="description" className="font-semibold text-lg">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-400 p-2 mb-2 rounded-md h-40"
        />
        <p className="text-sm text-gray-600">
          Enter any details that you want the course to include.
        </p>
      </div>

      <div className="space-y-1 w-full">
        <p className="text-sm text-red-500 font-medium">{error}</p>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-bold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Course"}
        </button>
      </div>
    </form>
  );
}
