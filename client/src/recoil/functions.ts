export const getUser = async (uid: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/` + uid, {
		method: "GET",
	});
	const data = await res.json();
	return data;
};

export const ask = async (
	uid: string,
	prompt: string,
	_type: string,
	dimensions: [number, number],
	documentId?: string
) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt,
			uid,
			// dimensions,
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
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/document/` + documentId,
		{
			method: "GET",
		}
	);
	const data = await res.json();
	return data;
};
