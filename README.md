# Next.js E-commerce Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup
1. Clone the GitHub repository
```bash
git clone https://github.com/ViragJain3010/ecommerce
```

2. Install the dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## Project Structure

```
public/
src/
  app/
    product/
    cart/
  components/
  hooks/
  lib/
  store/
  utils/
tailwind.config.mjs
package.json
```

- **src/app**: Contains the main application pages.
- **src/components**: Contains the reusable UI components.
- **src/hooks**: Contains custom hooks.
- **src/lib**: Contains library functions.
- **src/store**: Contains Redux store and slices.
- **src/utils**: Contains utility functions.

## Key Features

- **API**: Used [Dummy JSON](https://dummyjson.com/docs/products#products-category) API library for raw data
- **Redux**: State management using Redux.
- **Debounce**: Debouncing utility for optimizing performance.
- **Tailwind CSS & Shadcn UI**: Styling using Tailwind CSS & Shadcn UI
- **Next.js**: Server-side rendering and static site generation.

## Implemented Features

- **Searching**: Users can search for products using a search bar.
- **Filtering** by Category: Products can be filtered by categories.
- **Sorting**: Products can be sorted by different criteria (e.g., price, popularity).
- **Carts**: Users can add products to a cart and view their cart.
- **Product Details Page**: Detailed view of each product.
- **Lazy Loading**: Images and components are loaded lazily for better performance.
- **Shimmer Effect**: Modern UI with shimmer effect while loading content.
