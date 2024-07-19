import Image from "next/image";
import { Inter } from "next/font/google";
import PublicLayout from "@/components/layout/Public";
import PdfGenerator from "@/components/PdfGenerator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PublicLayout>
      <section className="public-container">
        <PdfGenerator />
      </section>
    </PublicLayout>
  );
}
