import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    html,
    body {
        font-family: 'Pretendard';
    },
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
`;

export default GlobalStyles;
