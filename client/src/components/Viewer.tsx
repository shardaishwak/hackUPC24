import { versionState } from "@/recoil";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const fetchVersion = async (versionId: string) => {
	try {
		const res = await fetch(`http://localhost:5001/version/${versionId}`);
		const data = await res.text();
		return data;
	} catch (err) {
		console.log(err);
	}
};

interface Props {
	versionId: string;
}

const Viewer: React.FC<Props> = (props) => {
	const { versionId } = props;
	const [versionUrl, setVersionUrl] = React.useState<string>("");

	React.useEffect(() => {
		(async () => {
			const htmlContent = await fetchVersion(versionId);
			if (!htmlContent) return;
			const blob = new Blob([htmlContent], { type: "text/html" });
			const url = URL.createObjectURL(blob);
			setVersionUrl(url);
		})();
	}, [versionId]);

	return (
		<Container>
			{versionUrl}
			<h1>Viewer</h1>
			<iframe src={versionUrl} width="100%" height="100%"></iframe>
		</Container>
	);
};

const Container = styled.div`
	width: 300px;
	height: 100vh;
`;

export default Viewer;
