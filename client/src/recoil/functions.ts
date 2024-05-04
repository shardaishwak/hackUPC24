export const getUser = async (uid: string) => {
	const res = await fetch("http://localhost:5001/user/" + uid, {
		method: "GET",
	});
	const data = await res.json();
	return data;
};

export const ask = async (
	uid: string,
	prompt: string,
	_type: string,
	documentId?: string
) => {
	const response = await fetch("http://localhost:5001/ask", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt,
			uid,
			engine: _type,
			...(documentId ? { documentID: documentId } : {}),
		}),
	});

	const type =
		response.status === 200
			? "html"
			: response.status === 202
			? "message"
			: "error";
	const ask_data = await response.json();

	return [type, ask_data];
};

export const getDocument = async (documentId: string) => {
	const res = await fetch("http://localhost:5001/document/" + documentId, {
		method: "GET",
	});
	const data = await res.json();
	return data;
};
