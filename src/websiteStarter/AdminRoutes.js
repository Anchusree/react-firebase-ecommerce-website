import Dashboard from "@material-ui/icons/Dashboard";
import AllCustomers from '../websiteStarter/AdminSidebars/AllCustomers'
import ManageProducts from '../websiteStarter/AdminSidebars/ManageProducts'
import ManageCategory from '../websiteStarter/AdminSidebars/ManageCategory'
import ManageFAQ from '../websiteStarter/AdminSidebars/ManageFAQ'
//import ManageOffers from '../websiteStarter/AdminSidebars/ManageOffers'
import ViewAllPayments from '../websiteStarter/AdminSidebars/ViewAllPayments'
import ViewAllComments from '../websiteStarter/AdminSidebars/ViewAllComments'
import { Person } from "@material-ui/icons";
import Logout from "./Logout";
import DashboardPage from "./AdminSidebars/DashboardPage";
import ManageAds from "./AdminSidebars/ManageAds";


const dashboardRoutes = [
      {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
      },
      {
        path: "/viewallcustomers",
        name: "View All Customers",
        rtlName: "",
        icon: Person,
        component: AllCustomers,
        layout: "/admin"
      },
      {
        path: "/manageproducts",
        name: "Manage Products",
        rtlName: "",
        icon: Dashboard,
        component: ManageProducts,
        layout: "/admin"
      },
      {
        path: "/managecategory",
        name: "Manage Category",
        rtlName: "",
        icon: Dashboard,
        component: ManageCategory,
        layout: "/admin"
      },
      // {
      //   path: "/manageoffers",
      //   name: "Manage Offers",
      //   rtlName: "",
      //   icon: Dashboard,
      //   component: ManageOffers,
      //   layout: "/admin"
      // },
      {
        path: "/manageads",
        name: "Manage Ads",
        rtlName: "",
        icon: Dashboard,
        component: ManageAds,
        layout: "/admin"
      },
      {
        path: "/viewallcomments",
        name: "View All Product Comments",
        rtlName: "",
        component: ViewAllComments,
        layout: "/admin"
      },
      {
        path: "/viewallpayments",
        name: "View All Payments",
        rtlName: "",
        icon: Dashboard,
        component: ViewAllPayments,
        layout: "/admin"
      },
      {
        path: "/managefaq",
        name: "Manage FAQ",
        rtlName: "",
        icon: Dashboard,
        component: ManageFAQ,
        layout: "/admin"
      },
      {
        path: "/logout",
        name: "Logout",
        rtlName: "",
        icon: Dashboard,
        component: Logout,
        layout: "/admin"
      }

]

export default dashboardRoutes;