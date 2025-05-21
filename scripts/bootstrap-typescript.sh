yarn add -D eslint prettier @petbee/eslint-config @petbee/prettier-config typescript @petbee/tsconfig
echo 'import petbeeConfig from '@petbee/eslint-config'; export default [...petbeeConfig]' > eslint.config.mjs
echo '"@petbee/prettier-config"' > .prettierrc
echo '{ "extends": "@petbee/tsconfig" }' > tsconfig.json
