import { documentState, userState } from "@/recoil";
import { getUser } from "@/recoil/functions";
import "@/styles/globals.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

export const Auth = (props) => {
	const { user, isAuthenticated } = useAuth0();
	const setUser = useSetRecoilState(userState);

	const setDocuments = useSetRecoilState(documentState);
	const documents = useRecoilValue(documentState);

	console.log(documents);

	React.useEffect(() => {
		(async () => {
			if (isAuthenticated && user?.sub) {
				const userData = await getUser(user?.sub?.split("|")?.[1]);
				setUser({
					_id: userData._id,
					uid: userData.uid,
					documents: userData.documents,
				});

				//add the documents to the document hash as format [id]: value
				if (props.cacheDocs) {
					setDocuments((prev) => ({
						documents: {
							...prev,
							...userData.documents.reduce(
								(acc, doc) => ({ ...acc, [doc._id]: doc }),
								{}
							),
						},
					}));
				}
			}
		})();
	}, [isAuthenticated, setUser, user?.sub]);
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
				<Component {...pageProps} />
			</RecoilRoot>
		</Auth0Provider>
	);
}
