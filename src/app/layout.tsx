import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body className="bg-gray-800 text-gray-200">
                <AuthProvider>
                    <header className="p-4 bg-gray-700 text-gray-100 border-b-4 border-gray-900">
                        <nav className="flex gap-4 items-center">
                            <Navbar />
                        </nav>
                    </header>

                    <main className="p-6 bg-gray-700 border-t-2 border-gray-900">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
