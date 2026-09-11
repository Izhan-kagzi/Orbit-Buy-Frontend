# 🛍️ Orbit Buy

### Premium Full-Stack Fashion E-Commerce Platform

Orbit Buy is a modern full-stack e-commerce platform designed for **men's and women's fashion**. It provides customers with a smooth shopping experience while giving administrators and managers powerful tools for managing products, orders, coupons, and store operations.

The platform combines a modern responsive UI with secure authentication, online payments, AI-powered fashion assistance, product comparison, and role-based dashboards.

---

## ✨ Features

### 👗 Fashion Shopping

- Men's fashion collection
- Women's fashion collection
- Product categories
- Brand-based browsing
- New Arrivals
- Best Sellers
- Flash Sale
- Sale collections
- Product search
- Advanced filtering
- Product sorting
- Product pagination
- Product details
- Product ratings
- Stock availability

### 🛒 Shopping Experience

- Shopping cart
- Wishlist
- Product comparison
- Quick product viewing
- Product quantity management
- Order placement
- Order confirmation
- Order history
- Profile management

### 🤖 AI Features

#### AI Stylist

Orbit Buy includes an AI-powered fashion stylist that helps customers discover suitable products based on their requirements.

The AI Stylist can:

- Understand customer fashion preferences
- Recommend products
- Provide reasons for recommendations
- Use the available product catalog
- Help customers discover suitable fashion items

#### AI Product Comparison

Customers can compare multiple products and receive AI-powered recommendations.

The comparison provides:

- Best Value
- Best Quality / Rating
- Best For
- Overall Recommendation

---

## 🔐 Authentication & Security

Orbit Buy uses secure authentication mechanisms including:

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Protected routes
- Role-based authorization
- Admin-only routes
- Manager/staff access control

Authentication tokens are handled on the frontend and protected backend routes verify authenticated users.

---

## 👨‍💼 Admin Dashboard

Administrators can manage the complete e-commerce system through the admin dashboard.

### Product Management

- Add products
- Edit products
- Delete products
- Upload product images
- Manage product information
- Manage pricing
- Manage stock
- Manage categories
- Manage brands

### Order Management

- View orders
- Update order status
- Manage cancellations
- Review customer orders

### Coupon Management

- Create coupons
- Edit coupons
- Delete coupons
- Manage discounts

### Store Management

- Manage store sections
- Manage categories
- Manage brands
- Manage products

### Analytics

The dashboard provides sales-related statistics and visual analytics for monitoring the store.

---

## 👨‍💼 Manager Dashboard

Orbit Buy supports manager/staff access for selected store-management operations.

Managers can be given access to functions such as:

- Product management
- Product editing
- Product deletion
- Product creation
- Store section management
- Category management
- Brand management
- Order-related management

Access is controlled using role-based authorization.

---

## 💳 Secure Online Payments

Orbit Buy integrates **Stripe** for online payments.

The backend handles important payment calculations server-side, including:

- Product prices
- Discounts
- Shipping
- Tax
- Final payable amount

This helps prevent users from manipulating the final order amount through frontend code.

---

## 🎨 Modern UI & UX

The frontend is designed with a premium fashion-oriented interface.

### UI Features

- Responsive design
- Mobile-friendly navigation
- Modern product cards
- Premium hero sections
- Fashion banners
- Animated sections
- Hover effects
- Smooth transitions
- Loading states
- Skeleton/loading UI
- Toast notifications
- Responsive admin dashboard
- Ai Stylist that helps users to choose, compare and provides info for fast ordering

### Animations

The project uses **Framer Motion** for smooth UI animations and transitions.

---

## ⚡ Performance

Orbit Buy uses several frontend performance techniques:

- React lazy loading
- Route-based code splitting
- Suspense
- Loading states
- Optimized component rendering
- Responsive images
- Reusable components

Pages are loaded dynamically where appropriate instead of loading the complete application at once.

---

# 🏗️ Tech Stack

## Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- React Icons
- Lucide React
- Recharts
- React Hot Toast
- Swiper

## Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt
- Multer

## Database

- JSON-based database (`db.json`)


## Payments

- Stripe

## Deployment

- Vercel — Frontend
- Render — Backend

---

