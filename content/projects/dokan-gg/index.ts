import type { Project } from "../types";
import cover from "./cover.webp";
import categories from "./categories.webp";
import products from "./products.webp";
import product from "./product.webp";
import reviews from "./reviews.webp";
import search from "./search.webp";
import cart from "./cart.webp";
import checkout from "./checkout.webp";
import orderTracking from "./order-tracking.webp";
import sellerDashboard from "./seller-dashboard.webp";
import sellerOrders from "./seller-orders.webp";
import sellerOrder from "./seller-order.webp";
import sellerProducts from "./seller-products.webp";
import productEditor from "./product-editor.webp";
import returns from "./returns.webp";
import adminAnalytics from "./admin-analytics.webp";
import adminCategories from "./admin-categories.webp";

const project: Project = {
  slug: "dokan-gg",
  title: "Dokan.gg | Multi-Vendor Marketplace",
  description:
    "A multi-vendor e-commerce marketplace for Bangladesh, with a storefront for shoppers and dashboards for sellers and admins.",
  longDescription:
    "Dokan.gg is an online marketplace I founded so any business in Bangladesh can open a store without building its own website. Shoppers browse products from many independent stores in one place, check out once (the basket is split into an order per store), pay by card or cash on delivery, and track each parcel to their door. Sellers get a storefront page and a dashboard for their catalogue, orders, customers, returns and payouts. Admins approve stores, moderate the categories and brands that sellers propose, and watch sales across the platform. The first version (2023–2024) ran on a Next.js and Material UI storefront, an Express API on AWS Lambda and a React seller app. In 2026 I rebuilt it from scratch as a monorepo: a Bun and Hono API over MongoDB, a Next.js storefront and a Next.js seller and admin dashboard, plus Playwright tools that import product catalogues from existing retailers. The screenshots show the rebuilt platform running with demo stores, products and orders.",
  type: "Project I worked on",
  role: "Founder & CEO",
  duration: "Apr 2022 - Present",
  icon: "store",
  gradient: "from-blue-600 to-indigo-400",
  tags: [
    "E-commerce",
    "Marketplace",
    "Next.js",
    "Bun",
    "MongoDB",
  ],
  technologies: [
    "TypeScript",
    "Next.js 16",
    "React 19",
    "Tailwind CSS 4",
    "shadcn/ui",
    "Bun",
    "Hono",
    "MongoDB",
    "Mongoose",
    "Zod",
    "Recharts",
    "Playwright",
    "SendGrid",
    "Express",
    "AWS Lambda",
    "Material UI",
  ],
  features: [
    "Storefront with global search, category and price filters, popularity sorting and compare-at pricing",
    "Product pages with image galleries, variants, specifications and verified-purchase reviews with helpful votes and seller replies",
    "One checkout across many stores: the basket is split into an order per store, paid by cash on delivery or card",
    "Bangladeshi address book (province, city, area) and order tracking with the courier and tracking number",
    "Seller dashboard for products, orders, customers and returns, with an 8-step product editor covering media, pricing, specs, shipping, warranty and variants",
    "Order workflow from pending to completed, with status history, courier hand-off and email notifications",
    "Returns and refunds, seller balances net of platform commission, and payout requests approved by admins",
    "Admin console for approving or suspending stores, managing users, and reviewing categories and brands proposed by sellers",
    "Platform analytics: GMV, conversion, sales over time, order-status breakdown and UTM attribution",
    "Catalogue import tools that scrape and bring in product listings from existing Bangladeshi retailers",
    "Accounts with email and password, Google sign-in and magic links, with separate customer, seller and admin roles",
  ],
  links: {
    live: "https://dokan.gg",
  },
  // The first image is the cover. The rest appear in the gallery.
  images: [
    { image: cover, caption: "The storefront home page, with the most-viewed products in the hero carousel." },
    { image: categories, caption: "Shop by category." },
    { image: products, caption: "Product listing with search, category, price and sort filters." },
    { image: product, caption: "A product page with its gallery, compare-at price, rating and view count." },
    { image: reviews, caption: "Reviews from verified buyers, with a rating breakdown, filters and helpful votes." },
    { image: search, caption: "Global search across products, stores, categories and brands." },
    { image: cart, caption: "The cart, with items from more than one store." },
    { image: checkout, caption: "Checkout with a saved address, cash on delivery or card, and one order per store." },
    { image: orderTracking, caption: "Order tracking for shoppers, with the courier and tracking number." },
    { image: sellerDashboard, caption: "The seller dashboard: revenue, orders and the latest orders to handle." },
    { image: sellerOrders, caption: "Seller orders, filterable by order and payment status." },
    { image: sellerOrder, caption: "An order's progress, items, customer and shipping details." },
    { image: sellerProducts, caption: "The seller's catalogue with prices, stock and status." },
    { image: productEditor, caption: "The 8-step product editor, on the specifications step." },
    { image: returns, caption: "Return requests, from request to refund." },
    { image: adminAnalytics, caption: "Platform analytics for admins: GMV, conversion, sales over time and order status." },
    { image: adminCategories, caption: "The admin review queue for categories that sellers propose." },
  ],
};

export default project;
