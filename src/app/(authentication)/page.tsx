"use client";
import Image from "next/image";
import phoneImg from "@/../public/phoneImg.svg";
import { GoBell } from "react-icons/go";
import { CiRoute } from "react-icons/ci";
import { IoCubeOutline } from "react-icons/io5";
import { FaWhatsapp, FaArrowRight, FaCheckCircle, FaStar, FaShieldAlt, FaHeadset, FaChartLine, FaHistory } from "react-icons/fa";
import vector from "@/../public/Vector.svg";
import IntroFooter from "../components/IntroFooter";
import IntroHeader from "../components/IntroHeader";
import VeriticalRuler from "@/../public/VerticalRuler.svg";
import InputSpace from "../components/InputSpace";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import productList, { ReviewInterface } from "@/interface/productList";
import SimpleSlider from "../components/SimpleSlider";
import fb from "@/../public/fb.svg";
import insta from "@/../public/Insta.svg";
import whtsap from "@/../public/whtsap.svg";
import footerDanda from "@/../public/FooterDanda.svg";
import CardLayout from "../components/CardLayout";
import logo from "@/../public/logo.svg";

import iphone15 from "@/../public/mobiles/iphone15.png";
import samsung24 from "@/../public/mobiles/samsung24.png";
import oneplus12 from "@/../public/mobiles/oneplus12.png";

// Demo data for featured products
const featuredProducts = [
	{
		id: 1,
		name: "iPhone 15 Pro Max",
		price: "₹1,49,999",
		commission: "₹5,000",
		requirement: "10 units",
		site: "Amazon",
		image: iphone15,
		cards: ["HDFC", "ICICI", "SBI"],
		rating: 4.8,
		reviews: 128
	},
	{
		id: 2,
		name: "Samsung S24 Ultra",
		price: "₹1,29,999",
		commission: "₹4,500",
		requirement: "8 units",
		site: "Flipkart",
		image: samsung24,
		cards: ["HDFC", "Axis", "Kotak"],
		rating: 4.7,
		reviews: 95
	},
	{
		id: 3,
		name: "OnePlus 12",
		price: "₹64,999",
		commission: "₹3,000",
		requirement: "15 units",
		site: "Amazon",
		image: oneplus12,
		cards: ["HDFC", "ICICI", "SBI", "Axis"],
		rating: 4.6,
		reviews: 156
	}
];

// Demo data for features
const features = [
	{
		icon: <FaChartLine className="w-14 h-14 rounded-3xl p-3 text-white bg-primaryBgClr" />,
		title: "Best Commission",
		description: "Earn the highest commission rates in the industry with our competitive pricing"
	},
	{
		icon: <FaArrowRight className="w-14 h-14 rounded-3xl p-3 text-white bg-primaryBgClr" />,
		title: "Fast Re-payment",
		description: "Get your earnings quickly with our streamlined payment process"
	},
	{
		icon: <FaHistory className="w-14 h-14 rounded-3xl p-3 text-white bg-primaryBgClr" />,
		title: "Order History & Analytics",
		description: "Track all your orders and get detailed analytics in one place"
	}
];

// Demo data for testimonials
const testimonials = [
	{
		name: "Rahul Sharma",
		role: "Premium Affiliate",
		image: "/testimonials/user1.jpg",
		rating: 5,
		text: "CardMitra has transformed my business. The platform is incredibly user-friendly and the support team is always ready to help."
	},
	{
		name: "Priya Patel",
		role: "Business Owner",
		image: "/testimonials/user2.jpg",
		rating: 5,
		text: "I've seen a 200% increase in my sales since joining CardMitra. The commission structure is very attractive."
	},
	{
		name: "Amit Kumar",
		role: "Enterprise Partner",
		image: "/testimonials/user3.jpg",
		rating: 5,
		text: "The best platform for managing phone orders. The real-time tracking and analytics are game-changers."
	}
];

export default function Home() {
	const [data, setData] = useState<productList[]>();
	const [stats, setStats] = useState({ orders: 0, transactions: 0, satisfaction: 0 });
	const statsRef = useRef(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get("/api/orders/products?limit=homePage");
				setData(response.data.data);
			} catch {
				console.log("Something went wrong, REFRESH THE PAGE");
			}
		}
		getData();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateStats();
				}
			});
		});

		if (statsRef.current) {
			observer.observe(statsRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const animateStats = () => {
		const duration = 2000; // 2 seconds
		const steps = 60;
		const interval = duration / steps;

		let currentStep = 0;
		const targetValues = {
			orders: 50000,
			transactions: 49, // 49Cr
			satisfaction: 98
		};

		const animate = () => {
			if (currentStep >= steps) return;

			setStats({
				orders: Math.round((targetValues.orders / steps) * currentStep),
				transactions: Math.round((targetValues.transactions / steps) * currentStep),
				satisfaction: Math.round((targetValues.satisfaction / steps) * currentStep)
			});

			currentStep++;
			setTimeout(animate, interval);
		};

		animate();
	};

	return (
		<>
			<header className="fixed w-full bg-white shadow-sm z-50">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-20">
						<Link href="/" className="flex items-center space-x-2">
							<Image src={logo} alt="CardMitra Logo" width={40} height={40} />
							<span className="text-2xl font-bold text-primaryBgClr">CardMitra</span>
						</Link>
						<nav className="hidden lg:flex space-x-8">
							<Link href="#products" className="text-gray-600 hover:text-primaryBgClr transition-colors">
								Products
							</Link>
							<Link href="#features" className="text-gray-600 hover:text-primaryBgClr transition-colors">
								Features
							</Link>
							<Link href="#stats" className="text-gray-600 hover:text-primaryBgClr transition-colors">
								Stats
							</Link>
							<Link href="#testimonials" className="text-gray-600 hover:text-primaryBgClr transition-colors">
								Testimonials
							</Link>
						</nav>
						<div className="hidden lg:flex items-center space-x-4">
							<Link href="/Auth/signup" className="text-gray-600 hover:text-primaryBgClr transition-colors">
								Sign Up 
							</Link>
							<Link href="/Auth/login" className="bg-primaryBgClr text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
								Login
							</Link>
						</div>
						<button 
							className="lg:hidden text-gray-600"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{isMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>
					{/* Mobile Menu */}
					<div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
							<Link href="#products" className="block px-3 py-2 text-gray-600 hover:text-primaryBgClr transition-colors">
								Products
							</Link>
							<Link href="#features" className="block px-3 py-2 text-gray-600 hover:text-primaryBgClr transition-colors">
								Features
							</Link>
							<Link href="#stats" className="block px-3 py-2 text-gray-600 hover:text-primaryBgClr transition-colors">
								Stats
							</Link>
							<Link href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-primaryBgClr transition-colors">
								Testimonials
							</Link>
							<Link href="/Auth/login" className="block px-3 py-2 text-gray-600 hover:text-primaryBgClr transition-colors">
								Login
							</Link>
							<Link href="/Auth/signup" className="block px-3 py-2 text-primaryBgClr hover:text-green-600 transition-colors">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</header>
			
			{/* Hero Section */}
			<section className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden pt-20">
				<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
				<div className="container mx-auto px-4 py-24 lg:py-32">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							Transform Your Business with 
						</h1>
						<h1 className="text-5xl md:text-6xl font-bold mb-8 text-primaryBgClr">CardMitra</h1>
						<p className="text-xl text-gray-300 mb-8">
							The ultimate platform for managing phone orders and maximizing your earnings
						</p>
						<div className="flex flex-col lg:flex-row gap-4 justify-center">
							<Link href="/Auth/signup" className="w-full lg:w-auto bg-primaryBgClr hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
								Get Started Now
							</Link>
							<Link href="#features" className="w-full lg:w-auto border border-white hover:border-primaryBgClr text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section id="products" className="py-12 sm:py-16 md:py-24 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Discover our most popular products with the best commission rates
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{featuredProducts.map((product) => (
							<div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
								<div className="relative h-48">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold mb-2">{product.name}</h3>
									<div className="flex items-center mb-4">
										<div className="flex text-yellow-400">
											{[...Array(5)].map((_, i) => (
												<FaStar key={i} className="w-5 h-5" />
											))}
										</div>
										<span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
									</div>
									<div className="space-y-2">
										<p className="text-gray-600">Price: <span className="font-semibold">{product.price}</span></p>
										<p className="text-gray-600">Commission: <span className="font-semibold text-primaryBgClr">{product.commission}</span></p>
										<p className="text-gray-600">Requirement: <span className="font-semibold">{product.requirement}</span></p>
									</div>
									<div className="mt-6 flex gap-2">
										{product.cards.map((card, index) => (
											<span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
												{card}
											</span>
										))}
									</div>
									<Link href="/Auth/signup" className="mt-6 block w-full bg-primaryBgClr hover:bg-green-600 text-white text-center py-3 rounded-full font-semibold transition-colors duration-300">
										Get Started
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-12 sm:py-16 md:py-24 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CardMitra?</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Experience the difference with our comprehensive platform
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
								<div className="mb-6">{feature.icon}</div>
								<h3 className="text-xl font-bold mb-4">{feature.title}</h3>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section id="stats" ref={statsRef} className="py-12 sm:py-16 md:py-24 bg-black text-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-8 text-center">
						<div className="p-8">
							<div className="text-5xl font-bold text-primaryBgClr mb-4">{stats.orders.toLocaleString()}+</div>
							<div className="text-xl text-gray-400">Total Orders</div>
						</div>
						<div className="p-8">
							<div className="text-5xl font-bold text-primaryBgClr mb-4">{stats.transactions}Cr+</div>
							<div className="text-xl text-gray-400">Total Transactions</div>
						</div>
						<div className="p-8">
							<div className="text-5xl font-bold text-primaryBgClr mb-4">{stats.satisfaction}%</div>
							<div className="text-xl text-gray-400">Customer Satisfaction</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="py-12 sm:py-16 md:py-24 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Join thousands of satisfied users who have transformed their business with CardMitra
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
								<div className="flex items-center mb-6">
									<div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
										<Image
											src={testimonial.image}
											alt={testimonial.name}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<h3 className="font-bold">{testimonial.name}</h3>
										<p className="text-gray-600">{testimonial.role}</p>
									</div>
								</div>
								<div className="flex text-yellow-400 mb-4">
									{[...Array(testimonial.rating)].map((_, i) => (
										<FaStar key={i} className="w-5 h-5" />
									))}
								</div>
								<p className="text-gray-600">{testimonial.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 sm:py-16 md:py-24 bg-primaryBgClr text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join thousands of successful affiliates and start earning today
					</p>
					<Link href="/Auth/signup" className="inline-block bg-white text-primaryBgClr px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
						Sign Up Now
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-8 sm:py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col lg:flex-row lg:justify-between gap-8">
						{/* CardMitra Section */}
						<div className="text-center lg:text-left">
							<h3 className="text-xl font-bold mb-4">CardMitra</h3>
							<p className="text-gray-400">
								Your trusted partner in phone order management
							</p>
						</div>

						{/* Quick Links and Legal Section */}
						<div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16">
							<div className="text-center lg:text-left">
								<h4 className="font-semibold mb-4">Quick Links</h4>
								<ul className="space-y-2">
									<li><Link href="#products" className="text-gray-400 hover:text-white">Products</Link></li>
									<li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
									<li><Link href="#stats" className="text-gray-400 hover:text-white">Stats</Link></li>
									<li><Link href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
								</ul>
							</div>
							<div className="text-center lg:text-left">
								<h4 className="font-semibold mb-4">Legal</h4>
								<ul className="space-y-2">
									<li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
									<li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
									<li><Link href="#" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
								</ul>
							</div>
						</div>

						{/* Connect With Us Section */}
						<div className="text-center lg:text-left">
							<h4 className="font-semibold mb-4">Connect With Us</h4>
							<div className="flex justify-center lg:justify-start space-x-4">
								<Link href="#" className="text-gray-400 hover:text-white">
									<Image src={fb} alt="Facebook" className="w-6 h-6" />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Image src={insta} alt="Instagram" className="w-6 h-6" />
								</Link>
								<Link href="#" className="text-gray-400 hover:text-white">
									<Image src={whtsap} alt="WhatsApp" className="w-6 h-6" />
								</Link>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
						<p>&copy; 2024 CardMitra. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</>
	);
}
