import React, { useState, useEffect } from "react";
import MyDocument from "@/components/MyDocument";
import dynamic from "next/dynamic";
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);
const PdfGenerator = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [generatedData, setGeneratedData] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
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
    alert("PDF  generated successfully!");
    setGeneratedData({
      title,
      text,
      imageUrl,
    });
    setText("");
    setTitle("");
    setImageUrl("");
  };

  return (
    <div className="">
      <div className="text-5xl font-bold text-center pb-4">
        <p className="text-white "> Pdf Generator </p>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded p-2 w-full mb-4"
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        className="border rounded p-2 w-full mb-4"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your text here"
        className="border rounded p-2 w-full mb-4"
        rows={4}
      />

      <div className="flex items-center gap-5">
        <button
          onClick={handleGeneratePdfUrl}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generate PDF
        </button>
        {pdfUrl && (
          <div className="mt-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2  bg-green-500 text-white rounded"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
      <div className="pt-7">
        {pdfUrl && (
          <PDFViewer width="100%" height="800px">
            <MyDocument
              text={generatedData?.text}
              title={generatedData?.title}
              imageUrl={generatedData?.imageUrl}
            />
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

export default PdfGenerator;
