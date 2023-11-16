yarn add -D eslint prettier @petbee/eslint-config @petbee/prettier-config typescript @petbee/tsconfig
echo '{ "extends": "@petbee/eslint-config" }' > .eslintrc
echo '"@petbee/prettier-config"' > .prettierrc
echo '{ "extends": "@petbee/tsconfig" }' > tsconfig.json
