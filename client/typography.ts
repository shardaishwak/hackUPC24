import styled, { css } from "styled-components";
export const limitLines = (maxLines: number) => `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${maxLines};
  line-clamp: ${maxLines};
  -webkit-box-orient: vertical;
  line-height: 2;
`;

// Headings
export const heading0 = css`
	font-size: 28px;
	line-height: 35px;
	font-weight: 700;
	letter-spacing: -0.56px;
`;

export const heading1 = css`
	font-size: 24px;
	line-height: 29px;
	font-weight: 700;
	letter-spacing: -0.24px;
`;

export const heading2 = css`
	font-size: 24px;
	line-height: 29px;
	font-weight: 600;
	letter-spacing: -0.24px;
`;

export const heading3 = css`
	font-size: 20px;
	line-height: 24px;
	font-weight: 700;
	letter-spacing: -0.2px;
`;

export const heading4 = css`
	font-size: 19px;
	line-height: 24px;
	font-weight: 700;
	letter-spacing: -0.19px;
`;

export const heading5 = css`
	font-size: 17px;
	line-height: 24px;
	font-weight: 600;
`;

export const heading6 = css`
	font-size: 15px;
	line-height: 18px;
	font-weight: 600;
`;
export const heading7 = css`
	font-size: 14px;
	line-height: 18px;
	font-weight: 600;
`;
export const heading8 = css`
	font-size: 13px;
	line-height: 16px;
	font-weight: 600;
`;
export const heading9 = css`
	font-size: 13px;
	line-height: 15px;
	font-weight: 700;
	letter-spacing: -0.13px;
`;
export const headingRecipeSection = css`
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: 0.48px;
	text-transform: uppercase;
`;
export const headingTooltip = css`
	font-size: 17px;
	font-weight: 700;
	line-height: 20px;
	letter-spacing: -0.17px;
`;
// other

export const bodyDesktop1 = css`
	font-size: 20px;
	font-weight: 400;
	line-height: 26px;
`;
export const bodyDesktop2 = css`
	font-size: 18px;
	font-weight: 600;
	line-height: 23px;
`;
export const bodyDesktop3 = css`
	font-size: 16px;
	font-weight: 400;
	line-height: 22px;
`;
export const bodyDesktop4 = css`
	font-size: 15px;
	font-weight: 400;
	line-height: 21px;
`;
export const bodyMobileTablet0 = css`
	font-size: 17px;
	font-weight: 400;
	line-height: 23px;
`;
export const bodyMobileTablet1 = css`
	font-size: 15px;
	font-weight: 400;
	line-height: 21px;
`;
export const bodyMobileTablet2 = css`
	font-size: 14px;
	font-weight: 400;
	line-height: 20px;
`;
export const bodyMobileTablet3 = css`
	font-size: 12px;
	font-weight: 600;
	line-height: 16px;
`;

export const inputRecipeSmall = css`
	font-size: 20px;
	font-weight: 400;
	line-height: 28px;
`;
export const inputRecipeBig = css`
	font-size: 40px;
	font-weight: 700;
	line-height: 46px;
	letter-spacing: -0.8px;
`;

export const categoryInactive = css`
	font-size: 13px;
	font-weight: 400;
	line-height: 20px;
`;
export const categoryActive = css`
	font-size: 13px;
	font-weight: 700;
	line-height: 20px;
`;
export const tag = css`
	font-size: 11px;
	font-weight: 700;
	line-height: 16px;
	text-transform: uppercase;
`;
export const metric = css`
	font-size: 32px;
	font-weight: 700;
	line-height: 37px;
	letter-spacing: -0.64px;
`;
export const quote = css`
	font-size: 18px;
	font-weight: 600;
	line-height: 24px;
`;
export const notification = css`
	font-size: 12px;
	font-weight: 700;
	line-height: 16px;
`;
export const stepNumber = css`
	font-size: 15px;
	font-weight: 700;
	line-height: 18px;
	letter-spacing: -0.15px;
`;
export const numbers = css`
	font-size: 86px;
	font-weight: 600;
	line-height: 86px;
`;

// Text formatting
export const ellipsisText = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const PreformattedParagraph = styled.pre`
	white-space: break-spaces;
`;
