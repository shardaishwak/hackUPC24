import mongoose, { Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
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

export interface IDocument extends MongooseDocument {
	_id: number;
	versions: Version[];
	versions_count: number;
	title: string;
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

const DocumentModel = new mongoose.Schema<IDocument>({
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
});

const UserModel = new mongoose.Schema<IUser>({
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

export const User = mongoose.model<IUser>("User", UserModel);
export const Document = mongoose.model<IDocument>("Document", DocumentModel);
export const Version = mongoose.model<Version>("Version", VersionModel);
