import React, { lazy } from "react";

const AddCategory = lazy(() => import("./admin/AddCategory"));
const ManageCategories = lazy(() => import("./admin/ManageCategories"));
const AddProduct = lazy(() => import("./admin/AddProduct"));
const ManageProducts = lazy(() => import("./admin/ManageProducts"));
const UpdateProduct = lazy(() => import("./admin/UpdateProduct"));
const UpdateCategory = lazy(() => import("./admin/UpdateCategory"));
const AdminDashboard = lazy(() => import("./user/AdminDashBoard"));

const lazyAdminDashboard = () => <AdminDashboard />;

const lazyUpdateCategory = () => <UpdateCategory />;

const lazyUpdateProduct = () => <UpdateProduct />;

const lazyManageProducts = () => <ManageProducts />;

const lazyAddCategory = () => <AddCategory />;

const lazyManageCategories = () => <ManageCategories />;

const lazyAddProduct = () => <AddProduct />;

export {
	lazyAdminDashboard,
	lazyUpdateCategory,
	lazyUpdateProduct,
	lazyAddCategory,
	lazyManageProducts,
	lazyAddProduct,
	lazyManageCategories,
};
