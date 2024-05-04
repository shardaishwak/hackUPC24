import { generalState } from "@/recoil";
import React from "react";
import { useRecoilValue } from "recoil";

export const MultiLangText: React.FC<React.PropsWithChildren<object>> = (
	props
) => {
	const text = useLanguage(props.children as string) || props.children;

	return <p>{text as string}</p>;
};

export default MultiLangText;

// Hook for using multiple language scheme

export const defaultLanguage = "en";
export const supportedLanguages = ["en", "it"];
export type SupportedLocale = "en" | "it";

export const useLanguage = (props: string | Array<string>) => {
	const lang = useRecoilValue(generalState).locale;

	let data;

	switch (lang) {
		case "en":
			data = require("./translations/en.json");
			break;
		case "ca":
			data = require("./translations/ca.json");
			break;
		case "es":
			data = require("./translations/es.json");
			break;
		case "fr":
			data = require("./translations/fr.json");
			break;
		case "shyriiwook":
			data = require("./translations/shyriiwook.json");
			break;
		default:
			data = require("./translations/en.json");
	}
	if (Array.isArray(props)) {
		const cache = {};
		for (let i = 0; i < props.length; i++) {
			cache[props[i]] = data[props[i]] || props[i];
		}
		return cache as object;
	}

	return (data[props as string] || props) as string;
};

export const systemLanguage = () => {
	const language = navigator.language || navigator?.userLanguage;
	return language?.split("-")[0];
};
