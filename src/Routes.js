import React from "react";
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

// TODO: Lazy load the following imports.
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import AdminDashboard from "./user/AdminDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";

import { lazyAddCategory, lazyManageCategories } from "./lazyComponents";

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
				<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
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
				<AdminRoute path="/admin/create/product" exact component={AddProduct} />
				<AdminRoute path="/admin/products" exact component={ManageProducts} />
				<AdminRoute
					path="/admin/product/update/:productId"
					exact
					component={UpdateProduct}
				/>
				<AdminRoute
					path="/admin/category/update/:categoryId"
					exact
					component={UpdateCategory}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
