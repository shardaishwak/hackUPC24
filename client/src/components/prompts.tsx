import styled from "styled-components";

import UserBlock from "./UserBlock";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Version } from "@/recoil";
import { useLanguage } from "@/i18n";

const Prompts: React.FC<{ list: Version[] }> = (props) => {
	const { list = [] } = props;
	const { user } = useAuth0();

	const text: any = useLanguage(["you", "generating", "generated", "for_you"]);
	return (
		<Container>
			<List>
				{list.map((item) => {
					return (
						<>
							<UserBlock
								agent={text.you}
								image={user?.picture || "/women.jpg"}
								value={item.prompt}
							/>
							<UserBlock
								agent="Framer"
								image="/agent.png"
								value={
									item._id === "temp"
										? text.generating
										: text.generated + " " + item.level + " " + text.for_you
								}
							/>
						</>
					);
				})}
			</List>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100vh;
	flex-direction: column;
	justify-content: flex-end;
	padding: 16px;
	box-sizing: border-box;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 24px;
`;

export default Prompts;
