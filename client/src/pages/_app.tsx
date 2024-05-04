import { documentState, userState } from "@/recoil";
import { getUser } from "@/recoil/functions";
import "@/styles/globals.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { heading5, heading6 } from "../../typography";

const inter = Inter({ subsets: ["latin"] });

export const Auth = (props) => {
	const { user, isAuthenticated, isLoading } = useAuth0();
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

	if (isLoading) {
		return (
			<LoadingContainer className={inter.className}>
				<h1>Framer Ai</h1>
				<p>Loading...</p>
			</LoadingContainer>
		);
	}
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

const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: white;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 24px;
	p {
		${heading5}
	}
`;
