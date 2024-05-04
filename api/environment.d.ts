declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		PORT: string;
		DATABASE_URI: string;
		JWT_SECRET: string;
		JWT_EXPIRATION: string;
		OPENAI_API: string;
	}
}
