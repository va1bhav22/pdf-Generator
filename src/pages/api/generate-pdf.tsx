import { NextApiRequest, NextApiResponse } from "next";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "../../components/MyDocument";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, text, imageUrl } = req.query;

  const document = (
    <MyDocument
      title={title as string}
      text={text as string}
      imageUrl={imageUrl as string}
    />
  );

  const pdfDoc = pdf([] as any);
  pdfDoc.updateContainer(document);
  const pdfBuffer = await pdfDoc.toBuffer();
  res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBuffer);
};
