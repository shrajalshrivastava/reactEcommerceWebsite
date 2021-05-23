module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    {
      "parser":"babel-eslint"
   },
    "google",
  ],
  rules: {
    quotes: ["error", "double"],
  },
};
