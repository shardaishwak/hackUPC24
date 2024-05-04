import mongoose, { Document as MongooseDocument } from "mongoose";

export interface User extends MongooseDocument {
	uid: number;
	documents: Document[];
}

export interface Version extends MongooseDocument {
	_id: number;
	title: string;
	content: string;
	prompt: string;
	created_at: Date;
	level: number;
}

export interface Document extends MongooseDocument {
	_id: number;
	versions: Version[];
	versions_count: number;
	title: string;
	created_at: Date;
	updated_at: Date;
}

const VersionModel = new mongoose.Schema<Version>({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	prompt: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
	},
	level: {
		type: Number,
		required: true,
	},
});

const DocumentModel = new mongoose.Schema<Document>({
	versions: {
		// reference to version document
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Version",
			},
		],
		default: [],
	},
	versions_count: {
		type: Number,
		default: 0,
	},
	title: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: new Date(),
	},
	updated_at: {
		type: Date,
		default: new Date(),
	},
});

const UserModel = new mongoose.Schema<User>({
	uid: {
		type: Number,
		required: true,
		unique: true,
	},
	documents: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Document",
			},
		],
		default: [],
	},
});

export const User = mongoose.model<User>("User", UserModel);
export const Document = mongoose.model<Document>("Document", DocumentModel);
export const Version = mongoose.model<Version>("Version", VersionModel);
