// components/PdfList.tsx
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MyDocument from "@/components/MyDocument";
import PublicLayout from "@/components/layout/Public";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("highToLow");
  const [selectedPdf, setSelectedPdf] = useState<PdfData | null>(null);

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("pdfs") || "[]");
    setPdfs(storedPdfs);
  }, []);

  const filteredPdfs = pdfs
    .filter((pdf) =>
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "highToLow") {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      } else {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }
    });

  const handleDelete = (index: number) => {
    const updatedPdfs = [...pdfs];
    updatedPdfs.splice(index, 1);
    setPdfs(updatedPdfs);
    localStorage.setItem("pdfs", JSON.stringify(updatedPdfs));
  };

  const handleSelectPdf = (pdf: PdfData) => {
    setSelectedPdf(pdf);
  };

  return (
    <PublicLayout>
      <section className="public-container flex flex-col gap-8">
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search Pdf ...."
            className="bg-transparent border outline-none py-2 text-sm text-white pl-4 rounded-full w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent text-gray-400 border py-2 rounded-full w-[200px] px-3 text-sm"
            >
              <option value="highToLow">High To Low</option>
              <option value="lowToHigh">Low To High</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-1/4 h-[600px] scroll-bar-none overflow-y-auto flex flex-col gap-y-3">
            {filteredPdfs.map((pdf, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl cursor-pointer"
                onClick={() => handleSelectPdf(pdf)}
              >
                <div className="flex justify-center">
                  <img src="/pdf.png" alt="" className="h-24" />
                </div>
                <div className="flex flex-col gap-y-3">
                  <p className="text-center text-xl">{pdf.title}</p>
                  <div className="flex w-full justify-between">
                    <p className="text-xs">
                      {new Date(pdf.timestamp).toLocaleString() ||
                        "Date Not Defined"}
                    </p>
                    <span
                      onClick={() => handleDelete(i)}
                      className="text-red-700 cursor-pointer "
                    >
                      <RiDeleteBin6Line size={20} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border w-[75%]">
            {selectedPdf && (
              <PDFViewer width="100%" height="600">
                <MyDocument {...selectedPdf} />
              </PDFViewer>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PdfList;
