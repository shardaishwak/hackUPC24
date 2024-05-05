import { versionState } from "@/recoil";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IoReload } from "react-icons/io5";

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

	const callbackReloadFrame = () => {
		if (document.getElementById("frame")?.src)
			document.getElementById("frame").src =
				document.getElementById("frame").src;
	};
	React.useEffect(() => {
		(async () => {
			const htmlContent = await fetchVersion(versionId);
			if (!htmlContent) return;
			const blob = new Blob(
				[
					htmlContent
						.replace("html ```", "")
						.replace("html", "")
						.replace("```", ""),
				],
				{
					type: "text/html",
				}
			);
			const url = URL.createObjectURL(blob);
			setVersionUrl(url);
		})();
	}, [versionId]);

	return (
		<Container>
			<iframe id="frame" src={versionUrl} width="100%" height="100%"></iframe>
			<ReloadButton onClick={callbackReloadFrame}>
				<IoReload size={24} />
			</ReloadButton>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;
	position: relative;

	iframe {
		border: none;
	}
`;

const ReloadButton = styled.button`
	position: absolute;
	top: 10px;
	left: 10px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

export default Viewer;
