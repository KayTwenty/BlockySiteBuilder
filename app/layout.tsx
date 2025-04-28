import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // <--- import

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout> {/* <-- WRAP inside client layout */}
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
