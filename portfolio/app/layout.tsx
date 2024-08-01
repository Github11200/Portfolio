import type { Metadata } from "next";
import { Inter as FontSans, Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const workSans = Work_Sans({
    subsets: ["latin"],
    variable: "--font-work-sans",
});

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100"],
});

export const metadata: Metadata = {
    title: "Jinay Patel's Portfolio",
    description:
        "Jinay Patel | Portfolio | Website | Full Stack Developer | Machine Learning | Competitive Programming | PyTorch | Vancouver | Next JS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-work-sans antialiased overflow-x-hidden",
                    workSans.className
                )}
            >
                <Analytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
