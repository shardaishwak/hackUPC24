import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Editor = () => {
	const codeString = "(num) => num + 1";

	const code = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Space Chair</title>
        <style>
            body {
                margin: 0;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #000;
                color: #fff;
                font-family: Arial, sans-serif;
            }
        </style>
    </head>
    
    <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
        <script>
            class SpaceChair {
                constructor() {
                    this.x = width / 2;
                    this.y = height / 2;
                    this.size = 80;
                }
    
                display() {
                    fill(100);
                    stroke(255);
                    rect(this.x, this.y, this.size, this.size);
                    rect(this.x - this.size / 2, this.y + this.size / 4, this.size * 2, this.size / 2);
                    rect(this.x - this.size / 4, this.y - this.size * 1.5, this.size / 2, this.size * 2);
                }
            }
    
            let spaceChair;
    
            function setup() {
                createCanvas(400, 400);
                spaceChair = new SpaceChair();
            }
    
            function draw() {
                background(0);
                spaceChair.display();
            }
        </script>
    </body>
    
    </html>`;
	return (
		<SyntaxHighlighter language="html" style={docco}>
			{code}
		</SyntaxHighlighter>
	);
};

export default Editor;
