import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html{
    font-size:62.5%;
    min-height:100%
}

*{
    box-sizing:inherit;
    margin:0;
    padding:0;
}

body{
    font-size:1.6rem;
    min-height:100%;
    box-sizing:border-box;
    color:red;
}


`;

export default GlobalStyles;