import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Editor: React.FC<{ code: string }> = (props) => {
	return (
		<SyntaxHighlighter
			customStyle={{ borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }}
			language="html"
			showLineNumbers
			style={atelierCaveLight}
		>
			{props.code}
		</SyntaxHighlighter>
	);
};

export default Editor;
