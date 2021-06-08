import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loading from "react-fullscreen-loading";
import registerServiceWorker from "./registerServiceWorker";
const Routes = lazy(() => import("./Routes"));

ReactDOM.render(
	<Suspense
		fallback={<Loading loading background="#000" loaderColor="#3498db" />}
	>
		<Routes />
	</Suspense>,
	document.getElementById("root")
);

registerServiceWorker();
