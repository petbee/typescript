yarn add -D eslint prettier @petbee/eslint-config @petbee/prettier-config typescript @petbee/tsconfig
echo '{ "extends": "petbee", "plugins": ["petbee"] }' > .eslintrc
echo '"@petbee/prettier-config"' > .prettierrc
echo '{ "extends": "@petbee/tsconfig" }' > tsconfig.json
