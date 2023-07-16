import { createGlobalStyle } from "styled-components";
import PretendardBold from 'src/fonts/PretendardBold.woff2';
import PretendardMedium from 'src/fonts/PretendardMedium.woff2';
import PretendardLight from 'src/fonts/PretendardLight.woff2';
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
        background-color: #ffffff;
    }
    html,
    body,
    div,
    span,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p, 
    a,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    form,
    label,
    table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }

    @font-face {
        font-family: 'Heavy';
        font-style: normal;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'Mid';
        font-style: normal;
        src: url("src/fonts/PretendardMedium.woff2") format("woff2");
    }
    @font-face {
        font-family: 'Light';
        font-style: normal;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
`;
 
export default GlobalStyles;