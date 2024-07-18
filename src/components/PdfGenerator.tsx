// components/PdfGenerator.tsx
import React, { useState, useEffect } from "react";

const PdfGenerator = () => {
  const [text, setText] = useState("Hello, this is your PDF content!");
  const [title, setTitle] = useState("My PDF Title");
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGeneratePdfUrl = () => {
    const url = new URL("/api/generate-pdf", window.location.origin);
    url.searchParams.append("title", title);
    url.searchParams.append("text", text);
    url.searchParams.append("imageUrl", imageUrl);
    setPdfUrl(url.toString());

    const storedPdfs = JSON.parse(localStorage.getItem("pdfs") || "[]");
    storedPdfs.push({
      title,
      text,
      imageUrl,
      url: url.toString(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("pdfs", JSON.stringify(storedPdfs));
  };

  return (
    <div className="pdf-generator">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded p-2 w-full mb-4"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
        className="border rounded p-2 w-full mb-4"
        rows={4}
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="border rounded p-2 w-full mb-4"
      />
      <button
        onClick={handleGeneratePdfUrl}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF URL
      </button>
      {pdfUrl && (
        <div className="mt-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfGenerator;
