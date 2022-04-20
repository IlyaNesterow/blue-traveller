import { createGlobalStyle } from 'styled-components'


const Global = createGlobalStyle`
  :root {
    --frame-clr: #ddd;
    --brand-clr: #0072ff;
    --white-clr: #fff;
    --font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, 'Ubuntu', 'Oxygen', Helvetica Neue, sans-serif !important;
    --title-clr: #333;
    --gold-clr: #FFD700;
    --grey: #777;
    --dark-clr: #222;
    --almost-white: #eee;
    --dark-green: #158151;
    --dark-red: #c44444;
    --disabled: #aaa;
    --box-shadow: 0px 16px 32px rgb(0 0 0 / 15%), 0px 3px 8px rgb(0 0 0 / 10%);
    --plain-shadow: 0px 6px 20px rgb(0 0 0 / 20%);
    --body-clr: #fff;
    --bright-bg: #fafafa;
    --opposite-contrast: #000;
    --btn-clr: linear-gradient(to left, #00cc66, #0072ff);
  }
  *{
    margin: 0 !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    outline: none !important;
  }
  html{
    -webkit-text-size-adjust: 100% !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;  
    background: transparent !important; 
  }
  body {
    font-family: var(--font-family) !important;
    color: var(--title-clr) !important;
    font-size: .9rem !important;
    line-height: 1.43 !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    background-color: var(--body-clr) !important; 
    min-height: 100vh !important;
    margin: 0 !important;
  }
  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline-block;
    margin: 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    font-family: var(--font-family);
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    border-radius: 8px;
    color: var(--title-clr);
  }
  svg{
    position: relative !important;
  }
  input{
    background-color: transparent !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  button, 
  input[type="button"], 
  input[type="reset"], 
  input[type="submit"]{
    -webkit-appearance: button !important;
  }
`

export default Global