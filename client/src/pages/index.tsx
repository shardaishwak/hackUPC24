import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Prompts from "@/components/prompts";
import Input from "@/components/input";
import styled from "styled-components";
import Output from "@/components/output";
import Viewer from "@/components/Viewer";
import SmallSidebar from "@/components/SmallSidebar";
import React, { use } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { generalState, userState } from "@/recoil";
import { useRouter } from "next/router";
import { ask, getUser } from "@/recoil/functions";
import { Auth } from "./_app";
import Image from "next/image";
import {
	bodyDesktop1,
	bodyDesktop3,
	bodyMobileTablet1,
	bodyMobileTablet2,
	bodyMobileTablet3,
	heading0,
	heading1,
	heading9,
	limitLines,
} from "../../typography";
import colors from "../../colors";
import { useLanguage } from "@/i18n";

const inter = Inter({ subsets: ["latin"] });

function selectFourItems(array) {
	const selectedItems = [];
	while (selectedItems.length < 4) {
		const randomIndex = Math.floor(Math.random() * array.length);
		const selectedItem = array[randomIndex];
		if (!selectedItems.includes(selectedItem)) {
			selectedItems.push(selectedItem);
		}
	}
	return selectedItems;
}

const DocumentRender: React.FC<{ documentId?: string }> = (props) => {
	const { documentId } = props;
	const uid = useRecoilValue(userState).uid;
	const router = useRouter();
	const [selected, setSelected] = React.useState<string | null>(null);

	const [temporaryPrompt, setTemporaryPrompt] = React.useState<string | null>(
		null
	);

	const text: any = useLanguage([
		"prompt_1",
		"prompt_2",
		"prompt_3",
		"prompt_4",
		"prompt_5",
		"prompt_6",
		"prompt_7",
		"prompt_8",
		"prompt_9",
		"prompt_10",
		"prompt_1_title",
		"prompt_2_title",
		"prompt_3_title",
		"prompt_4_title",
		"prompt_5_title",
		"prompt_6_title",
		"prompt_7_title",
		"prompt_8_title",
		"prompt_9_title",
		"prompt_10_title",
		"paragraph",
	]);

	const prompts = [
		{
			title: text.prompt_1_title,
			content: text.prompt_1,
		},
		{
			title: text.prompt_2_title,
			content: text.prompt_2,
		},
		{
			title: text.prompt_3_title,
			content: text.prompt_3,
		},
		{
			title: text.prompt_4_title,
			content: text.prompt_4,
		},
		{
			title: text.prompt_5_title,
			content: text.prompt_5,
		},
		{
			title: text.prompt_6_title,
			content: text.prompt_6,
		},
		{
			title: text.prompt_7_title,
			content: text.prompt_7,
		},
		{
			title: text.prompt_8_title,
			content: text.prompt_8,
		},
		{
			title: text.prompt_9_title,
			content: text.prompt_9,
		},
		{
			title: text.prompt_10_title,
			content: text.prompt_10,
		},
	];

	const [selectedPrompts, setSelectedPrompts] = React.useState<
		{ title: string; content: string }[]
	>([]);
	const setGeneral = useSetRecoilState(generalState);
	const general = useRecoilValue(generalState);

	React.useEffect(() => {
		setSelectedPrompts(selectFourItems(prompts));
	}, []);

	const callbackAsk = React.useCallback(
		async (value, _type) => {
			if (!uid) return;
			setSelected(value);
			setTemporaryPrompt(value);
			const [type, ask_data] = await ask(
				uid,
				value,
				_type,
				general.dimensions,
				documentId
			);

			if (type === "message") {
				// do something with ask_data.message
				setGeneral((prev) => ({
					...prev,
					message: ask_data.message,
				}));
			} else if (type === "error") {
				// do something with ask_data.error
				setGeneral((prev) => ({
					...prev,
					message: ask_data.error,
				}));
			} else {
				if (!documentId) {
					router.push("/d/" + ask_data?.document?._id);
				}
			}
			setTemporaryPrompt(null);
			setSelected(null);
		},
		[uid, documentId, general.dimensions]
	);
	return (
		<>
			<Main className={`${inter.className}`}>
				<Sidebar />
				<Container>
					<Prompts
						list={
							temporaryPrompt
								? ([
										{
											prompt: temporaryPrompt,
											_id: "temp",
											content: "Generating your game...",
											created_at: new Date().toISOString(),
											level: 1,
											title: "Generating your game...",
										},
								  ] as any)
								: []
						}
					/>
					{!selected && (
						<EmptyContainer>
							<Image
								src={"/cloud.gif"}
								width={300}
								height={200}
								style={{ objectFit: "cover", borderRadius: 20 }}
								alt="Cloud"
							/>
							<Title>Framer AI</Title>
							<P>{text.paragraph}</P>
							<Suggestions>
								{selectedPrompts.map((prompt) => (
									<Suggestion
										key={prompt}
										onClick={() => callbackAsk(prompt.content, "2D")}
									>
										<h3>{prompt.title}</h3>
										<p>{prompt.content}</p>
									</Suggestion>
								))}
							</Suggestions>
						</EmptyContainer>
					)}
					<Input onClick={callbackAsk} />
				</Container>
			</Main>
		</>
	);
};

export default function Home() {
	return (
		<>
			<Head>
				<title>Framer AI</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Auth cacheDocs />

			<DocumentRender />
		</>
	);
}

const Main = styled.div`
	display: grid;
	grid-template-columns: 256px 1fr;
`;

const Container = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 8px;
	width: 800px;
	margin: 0 auto;
`;

const EmptyContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 30%;
`;

const Title = styled.h1`
	${heading0}
	font-size: 42px;
	margin-top: 36px;
`;

const P = styled.p`
	${bodyMobileTablet2}
	margin-top: 12px;
	text-align: center;
`;

const Suggestions = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 12px;
	width: 100%;
	margin-top: 96px;
`;

const Suggestion = styled.div`
	padding: 16px;
	border: 2px solid ${colors.blue300};
	border-radius: 16px;
	cursor: pointer;
	width: 43%;
	h3 {
		${bodyDesktop3}
		font-weight: 600;
	}
	p {
		${bodyMobileTablet2}
		opacity: 0.65;
		margin-top: 4px;
		${limitLines(2)}
		line-height: 21px;
	}

	&:hover {
		background: ${colors.blue100};
	}
`;
