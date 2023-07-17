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
        font-family: 'H0';
        font-style: normal;
        font-size: 40px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H1';
        font-style: normal;
        font-size: 35px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H2';
        font-style: normal;
        font-size: 30px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H3';
        font-style: normal;
        font-size: 28px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H4';
        font-style: normal;
        font-size: 26px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H5';
        font-style: normal;
        font-size: 20px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'H6';
        font-style: normal;
        font-size: 17px;
        src: url("src/fonts/PretendardBold.woff2") format("woff2");
    }
    @font-face {
        font-family: 'M0';
        font-style: normal;
        font-size: 55px;
        src: url("src/fonts/PretendardMedium.woff2") format("woff2");
    }
    @font-face {
        font-family: 'M1';
        font-style: normal;
        font-size: 22px;
        src: url("src/fonts/PretendardMedium.woff2") format("woff2");
    }
    @font-face {
        font-family: 'M2';
        font-style: normal;
        font-size: 14px;
        src: url("src/fonts/PretendardMedium.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L0';
        font-style: normal;
        font-size: 50px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L1';
        font-style: normal;
        font-size: 25px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L2';
        font-style: normal;
        font-size: 20px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L3';
        font-style: normal;
        font-size: 18px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L4';
        font-style: normal;
        font-size: 16px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
    @font-face {
        font-family: 'L5';
        font-style: normal;
        font-size: 14px;
        src: url("src/fonts/PretendardLight.woff2") format("woff2");
    }
`;
 
export default GlobalStyles;