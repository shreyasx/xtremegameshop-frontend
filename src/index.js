import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loading from "react-fullscreen-loading";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { GoogleOAuthProvider } from "@react-oauth/google";
const Routes = lazy(() => import("./Routes"));

ReactDOM.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
		<Suspense
			fallback={<Loading loading background="#000" loaderColor="#3498db" />}
		>
			<Routes />
		</Suspense>
	</GoogleOAuthProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
