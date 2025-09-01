import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AllSubcategories from './Pages/AllSubcategories.jsx'
import Shop from './Pages/Shop.jsx'
import AuthLayout from './component/AuthLayout.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'  
// import MenProducts from './Pages/MenProducts.jsx'
// import KidProducts from './Pages/KidProducts.jsx'
import CategoryPage from './Pages/CategoryPage.jsx'
import CategoryAndSubcategoryPage from './Pages/CategoryAndSubcategoryPage.jsx'
import Products from './Pages/Products.jsx'
import Product from './Pages/Product.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
// import OrderConfirmation from './Pages/OrderConfirm.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Shop /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      // { path: "/men/:subcategory", element: <MenProducts /> },
      // { path: "/kid/:subcategory", element: <KidProducts /> },
      { path: "/:category/:subcategory", element: <CategoryAndSubcategoryPage /> },
      {path: "/all", element: <Products/>},
      {path: "/:category/:subcategory/:id", element: <Product/>},
      {path:"/collections",element:<CategoryPage/>},
      {path:"/checkout",element:
      <AuthLayout authentication={true}>
        <CheckoutPage/>
        </AuthLayout>}
      ,      {path:"/collections/:category",element:<AllSubcategories/>},
      // {path:"/order/:id",element:<OrderConfirmation/>}


    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
