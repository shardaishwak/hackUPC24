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
}

export interface IDocument extends MongooseDocument {
	_id: number;
	versions: Version[];
	versions_count: number;
	title: string;
}

const VersionModel = new mongoose.Schema<Version>(
	{
		_id: {
			type: Number,
			required: true,
			unique: true,
		},
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
	},
	{ _id: false }
);

const DocumentModel = new mongoose.Schema<IDocument>({
	_id: {
		type: Number,
		required: true,
		unique: true,
	},
	versions: {
		type: [VersionModel],
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
		type: [DocumentModel],
		default: [],
	},
});

export const User = mongoose.model<IUser>("User", UserModel);
export const Document = mongoose.model<IDocument>("Document", DocumentModel);
export const Version = mongoose.model<Version>("Version", VersionModel);
