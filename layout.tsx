import { DataProvider } from "@/components/context";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
