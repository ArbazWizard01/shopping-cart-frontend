# Verto — Shopping Cart Frontend

This is the frontend application for a modern e-commerce shopping cart demo, designed to showcase robust state management, persistence, and custom styling in a React environment. It is a single-page application that simulates product listing and checkout processes by communicating with a local REST API endpoint.

#### Backend repository: https://github.com/ArbazWizard01/shopping-cart-backend

## Features 

### Key Frontend Features

1.  **Product Listing:** Fetches and displays a list of items from a simulated API.
2.  **Cart Management (CRUD):** Implements core shopping cart functionalities: adding, increasing/decreasing quantity, and removing items.
3.  **Client-Side Persistence:** Utilizes **`localStorage`** to save and restore the user's cart state across page reloads and sessions.
4.  **Custom UI Controls:** Features a highly customized and interactive **`QuantitySelector`** component built with **`styled-components`** and modern icons (`react-icons/fi`).
5.  **Checkout Simulation:** A `handleCheckout` function simulates a transaction via a `POST` request to the backend.
6.  **Technology Stack:** Leverages **Axios** for API calls, **Ant Design (antd)** for basic layout and buttons, **`react-router-dom`** for navigation, and **`styled-components`** for component styling.

-----

## Quick Start 

### Requirements

Requires **Node.js** and **npm** (or yarn) installed.

### Installation and Running

```bash
# Clone the repository
git clone [repository-url] verto-shopping-cart.frontend
cd verto-shopping-cart.frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

Open `http://localhost:5173` (or the port Vite prints in your terminal) in your browser.

-----

## Assumptions & Design Choices 

Below are the main assumptions and design choices made while building the cart functionality:

| Area | Choice | Rationale/Trade-off |
| :--- | :--- | :--- |
| **State Management** | **React Context** + **`useReducer`** | Provides a predictable, centralized state store for all cart operations, easily testable and scalable for this size application. |
| **Data Persistence** | **`localStorage`** | Ideal for non-critical, client-side data like cart contents. Ensures data persists across tabs and browser restarts without requiring database access. |
| **UI/Styling** | Ant Design + **`styled-components`** | AntD is fast for common elements, while `styled-components` allows for highly customized, unique components like the neumorphic `QuantitySelector`. |
| **Data Fetching** | **Axios** (direct calls) | Simple, explicit control over requests for product listing and checkout simulation. |

-----

## Architecture and Data Flow 

  - **Global State:** The cart items array is managed within the **`CartContext`** using a `useReducer` hook.
  - **Initial Load:** The `useReducer` is initialized using a function that attempts to parse the cart items from **`localStorage`**. If successful, the previously saved cart is restored; otherwise, it starts empty.
  - **Data Flow:** Any cart action (e.g., `addToCart`) triggers a `dispatch` to the `cartReducer`.
  - **Persistence Hook:** The `cartReducer` contains logic to **synchronously update `localStorage`** immediately after the state has been successfully updated, ensuring persistence on every modification.
  - **Component Interaction:** `Products.jsx` and `Cart.jsx` consume the state and actions via the dedicated `useCart` custom hook, avoiding prop-drilling.

-----

## Project Structure (Important Files) :file\_folder:

| Filepath | Responsibility |
| :--- | :--- |
| `src/context/CartContext.js` | **State Engine.** Defines the `cartReducer`, handles `localStorage` load/save logic, and exports the `CartProvider`. |
| `src/components/Products.jsx` | **Product List.** Handles mock product fetching, renders product cards, and calls the `addToCart` action. |
| `src/components/Cart.jsx` | **Cart View.** Renders cart items, integrates the custom styled **`QuantitySelector`**, calculates total, and simulates `handleCheckout`. |
| `src/App.jsx` | **Root & Routing.** Sets up `react-router-dom` routes (`/`, `/cart`) and wraps the entire application with the `CartProvider`. |

-----

## Key Components and Responsibilities 

  - **`CartProvider` (`CartContext.js`):** The primary container responsible for handling all state transitions, enforcing business logic (quantity control), and synchronizing the entire cart data with `localStorage`.
  - **`cartReducer` (`CartContext.js`):** A pure function that calculates the next state based on the current state and a dispatched action. It is the central authority for all cart data manipulation.
  - **`QuantitySelector` (`Cart.jsx`):** A composition of `styled-components` that isolates the visual design and interactive logic for increasing and decreasing item quantity, providing a superior UI experience.
  - **`useCart` (`CartContext.js`):** Custom hook that simplifies access to cart state (`cartItems`) and actions (`addToCart`, `increaseQuantity`, etc.) for any consuming component.
