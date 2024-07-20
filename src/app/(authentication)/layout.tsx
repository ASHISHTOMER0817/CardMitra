import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// import { GlobalStateProvider } from "./components/globalVariable";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Card Mitra",
	description: "Cards to Cash",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<ToastContainer/>
			</body>
		</html>
	);
}
