import React, { lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import Cart from "./core/Cart";
import Delete from "./core/delete";
import Verify from "./user/verify";
import ResetPassword from "./user/resetPass";
import Purchases from "./user/purchases";
import ForgotPassword from "./user/forgotPass";
import NewPassword from "./user/newPassword";
import {
	lazyAdminDashboard,
	lazyUpdateCategory,
	lazyUpdateProduct,
	lazyAddCategory,
	lazyManageProducts,
	lazyAddProduct,
	lazyManageCategories,
} from "./lazyComponents";

const AdminRoute = lazy(() => import("./auth/helper/AdminRoutes"));

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/cart" exact component={Cart} />
				<Route path="/verify/:token" exact component={Verify} />
				<Route path="/forgot-password/:token" exact component={NewPassword} />
				<Route path="/forgot-password" exact component={ForgotPassword} />
				<PrivateRoute path="/reset-password" exact component={ResetPassword} />
				<PrivateRoute path="/purchases" exact component={Purchases} />
				<Route path="/delete-account" exact component={Delete} />
				<PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
				<AdminRoute
					path="/admin/dashboard"
					exact
					component={lazyAdminDashboard}
				/>
				<AdminRoute
					path="/admin/create/category"
					exact
					component={lazyAddCategory}
				/>
				<AdminRoute
					path="/admin/categories"
					exact
					component={lazyManageCategories}
				/>
				<AdminRoute
					path="/admin/create/product"
					exact
					component={lazyAddProduct}
				/>
				<AdminRoute
					path="/admin/products"
					exact
					component={lazyManageProducts}
				/>
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={lazyUpdateProduct}
				/>
				<AdminRoute
					path="/admin/category/update/:categoryId"
					exact
					component={lazyUpdateCategory}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
