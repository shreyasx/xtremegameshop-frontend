import React, { Suspense, lazy } from "react";

const AddCategory = lazy(() => import("./admin/AddCategory"));
const ManageCategories = lazy(() => import("./admin/ManageCategories"));

const lazyAddCategory = () => (
	<Suspense fallback={<h1 className="text-white">Loading admin routes...</h1>}>
		<AddCategory />
	</Suspense>
);

const lazyManageCategories = () => (
	<Suspense fallback={<h1 className="text-white">Loading admin routes...</h1>}>
		<ManageCategories />
	</Suspense>
);

export { lazyAddCategory, lazyManageCategories };
