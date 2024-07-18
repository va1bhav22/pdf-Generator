// components/PdfList.tsx
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MyDocument from "@/components/MyDocument";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface PdfData {
  title: string;
  text: string;
  imageUrl: string;
  url: string;
  timestamp: string;
}

const PdfList = () => {
  const [pdfs, setPdfs] = useState<PdfData[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<PdfData | null>(null);

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("pdfs") || "[]");
    setPdfs(storedPdfs);
  }, []);

  const handleViewPdf = (pdf: PdfData) => {
    setSelectedPdf(pdf);
  };

  return (
    <div className="pdf-list">
      <h2 className="text-xl font-bold">Stored PDFs</h2>
      {selectedPdf ? (
        <div className="mt-4">
          <h3 className="text-lg font-bold">{selectedPdf.title}</h3>
          <PDFViewer width="600" height="400">
            <MyDocument
              text={selectedPdf.text}
              title={selectedPdf.title}
              imageUrl={selectedPdf.imageUrl}
            />
          </PDFViewer>
          <button
            onClick={() => setSelectedPdf(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close PDF
          </button>
        </div>
      ) : (
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index} className="mb-4">
              <div className="mb-2">
                <strong>Title:</strong> {pdf.title}
              </div>
              <div className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(pdf.timestamp).toLocaleString()}
              </div>
              <button
                onClick={() => handleViewPdf(pdf)}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                View PDF
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PdfList;
