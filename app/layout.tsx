import { AppAuth } from "@/components/App/AppAuth";
import AppLayout from "@/components/App/AppLayout";
import { AppProvider } from "@/providers/app.provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <AppLayout>
        <AppAuth>{children}</AppAuth>
      </AppLayout>
    </AppProvider>
  );
}
