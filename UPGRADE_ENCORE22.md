#Upgrade to symfony encore 0.22 (babel 7, webpack 4)
```bash
yarn remove @fortawesome/fontawesome-free-solid @fortawesome/free-regular-svg-icons extract-text-webpack-plugin babel-polyfill webpack webpack-dev-server datatables datatables datatables.net datatables.net-bs4 datatables.net-buttons datatables.net-dt datatables.net-plugins datatables.net-responsive datatables.net-responsive-bs4 jquery-ui node-sass npm-run-all babel-core babel-loader babel-plugin-flow-runtime babel-plugin-transform-class-properties babel-plugin-transform-decorators-legacy babel-plugin-transform-export-extensions babel-preset-env babel-preset-react css-loader file-loader html-loader npm-run-all sass-loader url-loader webpack-notifier
yarn add @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @babel/polyfill 
yarn add --dev postcss-loader webpack-notifier @babel/preset-react sass-loader node-sass webpack-dev-server mini-css-extract-plugin eslint babel-eslint@^8.2.1 eslint-loader@^1.9.0 eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

```