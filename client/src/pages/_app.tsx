import { userState } from "@/recoil";
import "@/styles/globals.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";

const Auth = () => {
	const { user, isAuthenticated, loginWithRedirect } = useAuth0();
	const setUser = useSetRecoilState(userState);

	React.useEffect(() => {
		(async () => {
			if (isAuthenticated) {
				const res = await fetch(
					"http://localhost:5001/user/" + user?.sub?.split("|")[1],
					{
						method: "GET",
					}
				);
				const data = await res.json();
				setUser({
					_id: data._id,
					uid: data.uid,
					documents: data.documents,
				});
			}
		})();
	}, [isAuthenticated]);

	return (
		<button onClick={() => loginWithRedirect()} disabled={isAuthenticated}>
			Login
		</button>
	);
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
			clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
			}}
		>
			<RecoilRoot>
				<Auth />
				<Component {...pageProps} />
			</RecoilRoot>
		</Auth0Provider>
	);
}
