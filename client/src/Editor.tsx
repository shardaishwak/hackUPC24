import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Editor: React.FC<{ code: string }> = (props) => {
	const codeString = "(num) => num + 1";

	return (
		<SyntaxHighlighter language="html" style={docco}>
			{props.code}
		</SyntaxHighlighter>
	);
};

export default Editor;
