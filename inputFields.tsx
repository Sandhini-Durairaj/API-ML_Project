'use client'
import React, { useState } from "react";
import Input from "@/components/input";
import BooksPage from "./table";

const BookForm = () => {
  const [formData, setFormData] = useState<any>({
    title: "",
    authors: "",
    language_code: "",
    num_pages: "",
    ratings_count: "",
    text_reviews_count: "",
    publication_date: "",
    publisher: "",
  });

  const [submittedBooks, setSubmittedBooks] = useState<Record<string, string | number>[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showForm, setShowForm] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);

  // Fields that Flask API expects
  const apiFields = [
    "title",
    "authors",
    "publication_date",
    "ratings_count",
    "num_pages",
    "text_reviews_count",
    "language_code",
    "publisher",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { [key: string]: string } = {};
    apiFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Prepare payload
      const payload: any = {};
      apiFields.forEach((field) => {
        if (field in formData) {
          if (["ratings_count", "num_pages", "text_reviews_count"].includes(field)) {
            payload[field] = Number(formData[field]) || 0;
          } else {
            payload[field] = formData[field];
          }
        }
      });

      const response = await fetch("https://api-ml-project.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        //use average_rating, not rating_class
        setPrediction(result.average_rating.toFixed(2)); // e.g. "3.91"

        const bookWithPrediction = {
          ...formData,
          prediction: result.average_rating.toFixed(2),
        };

        setSubmittedBooks((prev) => [...prev, bookWithPrediction]);
        setShowForm(false);
      } else {
        console.error("API Error:", result.error);
      }

    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <>
      {showForm ? (
        <div className="max-w-3xl mx-auto p-6 bg-transparent rounded-xl mt-2">
          <h2 className="text-xl font-semibold mb-6 text-left text-gray-800">Add Book Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              <Input
                key={key}
                label={key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                name={key}
                type={
                  key === "publication_date"
                    ? "date"
                    : key.includes("count") || key.includes("pages")
                      ? "number"
                      : "text"
                }
                placeholder={`Enter ${key.replace("_", " ")}`}
                value={value}
                onchange={handleChange}
                errors={errors[key] ? { message: errors[key] } : undefined}
              />
            ))}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              >
                Submit Book Info
              </button>
            </div>
          </form>

          {/* Show prediction immediately after submission */}
          {prediction !== null && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              Predicted Rating Class: <strong>{prediction}</strong>
            </div>
          )}
        </div>
      ) : (
        <BooksPage data={submittedBooks} />
      )}
    </>
  );
};

export default BookForm;
