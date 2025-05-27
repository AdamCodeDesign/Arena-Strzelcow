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
            <body>
                <AuthProvider>
                    <header className="p-4 bg-blue-600 text-white">
                        <nav className="flex gap-4">
                            <Navbar />
                        </nav>
                    </header>

                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
