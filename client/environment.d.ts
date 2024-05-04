// Types for the enivronment variables used in the application.
// process.env.[variable] is used to get the value of the environment variable.

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_AUTH0_DOMAIN: string;
			NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
			NEXT_PUBLIC_AUTH0_REDIRECT_URI: string;
		}
	}
}

export {};
