declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_AUTH0_DOMAIN: string;
			NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
			NEXT_PUBLIC_AUTH0_REDIRECT_URI: string;
			NEXT_PUBLIC_API_URL: string;
		}
	}
}

export {};
