// hash map for storing versions

import { atom } from "recoil";

export interface Document {
	_id: string;
	title: string;
	versions: Version[];
}

export interface Version {
	_id: number;
	title: string;
	content: string;
	prompt: string;
	created_at: Date;
	level: number;
}

export interface User {
	_id: string;
	uid: string;
	documents: Document;
}
interface DocumentState {
	[key: string]: {
		_id: string;
		title: string;
		versions: Version[];
	};
}

export const documentState = atom<DocumentState>({
	key: "documentState",
	// hashmap of documents
	default: {},
});

interface VersionState {
	[key: string]: {
		_id: number;
		title: string;
		content: string;
		prompt: string;
		created_at: Date;
		level: number;
	};
}

export const versionState = atom<VersionState>({
	key: "versionState",
	// hashmap of versions
	default: {},
});

interface UserState {
	_id: string;
	uid: string;
	documents: Document[];
}

export const userState = atom<UserState>({
	key: "userState",
	default: {
		_id: "",
		uid: "",
		documents: [],
	},
});

export const generalState = atom({
	key: "generalState",
	default: {
		locale: "en",
	},
});
