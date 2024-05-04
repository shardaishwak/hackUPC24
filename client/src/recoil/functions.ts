export const getUser = async (uid: string) => {
	const res = await fetch("http://localhost:5001/user/" + uid, {
		method: "GET",
	});
	const data = await res.json();
	return data;
};

export const ask = async (uid: string, prompt: string, documentId?: string) => {
	const response = await fetch("http://localhost:5001/ask", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			prompt,
			uid,
			...(documentId ? { documentID: documentId } : {}),
		}),
	});
	const ask_data = await response.json();
	return ask_data;
};
