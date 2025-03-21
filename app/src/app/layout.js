import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from './_componets/Nav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pung Game",
  description: "A multiplayer ping pong game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white">
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
