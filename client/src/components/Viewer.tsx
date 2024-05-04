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
			const blob = new Blob([htmlContent.replace("html ```", "")], {
				type: "text/html",
			});
			const url = URL.createObjectURL(blob);
			setVersionUrl(url);
		})();
	}, [versionId]);

	return (
		<Container>
			<iframe src={versionUrl} width="100%" height="100%"></iframe>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;

	iframe {
		border: none;
	}
`;

export default Viewer;
