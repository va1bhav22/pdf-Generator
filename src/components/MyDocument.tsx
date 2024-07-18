// components/MyDocument.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#E4E4E4",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: 20,
  },
});

// Create Document Component
const MyDocument = ({
  text,
  title,
  imageUrl,
}: {
  text: string;
  title: string;
  imageUrl: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {title && <Text style={styles.title}>{title}</Text>}
      {imageUrl && <Image src={imageUrl} style={styles.image} />}
      <View style={styles.section}>
        <Text>{text}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
