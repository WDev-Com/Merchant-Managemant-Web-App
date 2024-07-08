import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";
import BidsList from "./component/oprations/bidslist";
import MerchantManagement from "./component/oprations/merchantManagement";
import AddNewBid from "./component/oprations/addBids";
import AddNewMerchant from "./component/oprations/addNewMerchant";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UpdateMerchant from "./component/oprations/updateMerchant";
import MerchantDashboard from "./component/merchant/merchantDashboard";
import MerchantBids from "./component/merchant/MerchantBids";
import UpdateBids from "./component/oprations/updateBid";
import ToBid from "./component/merchantServices/Tobid";
import BiddingForm from "./component/merchantServices/BiddingForm";
import ViewMerchantBids from "./component/oprations/viewBids";
import Layout from "./component/common/Layout";
import ProtectedAdmin from "./component/auth/ProtectedAdim";
import ProtectedUser from "./component/auth/ProtectedUser";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/loginpage", element: <LoginPage /> },
      { path: "/signuppage", element: <SignUpPage /> },
      {
        path: "/merchantlist",
        element: (
          <ProtectedAdmin>
            <MerchantManagement />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/bidslist",
        element: (
          <ProtectedAdmin>
            <BidsList />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/Updatebid/:id",
        element: (
          <ProtectedAdmin>
            <UpdateBids />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/addNewbid",
        element: (
          <ProtectedAdmin>
            <AddNewBid />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/biddingForm/:mid/:bid",
        element: (
          <ProtectedUser>
            <BiddingForm />
          </ProtectedUser>
        ),
      },
      {
        path: "/tobid/:id",
        element: (
          <ProtectedUser>
            <ToBid />
          </ProtectedUser>
        ),
      },
      {
        path: "/updatemerchant/:id",
        element: (
          <ProtectedAdmin>
            <UpdateMerchant />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/viewMerchantbids/:id",
        element: (
          <ProtectedAdmin>
            <ViewMerchantBids />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/addMerchant",
        element: (
          <ProtectedAdmin>
            <AddNewMerchant />
          </ProtectedAdmin>
        ),
      },
      {
        path: "/mDashBoard/:mid",
        element: (
          <ProtectedUser>
            <MerchantDashboard />
          </ProtectedUser>
        ),
      },
      {
        path: "/ourbids/:mid",
        element: (
          <ProtectedUser>
            <MerchantBids />
          </ProtectedUser>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
