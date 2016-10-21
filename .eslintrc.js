module.exports = {
    "extends": "standard",
    "installedESLint": true,
    "plugins": [
        "standard",
        "promise"
    ],
    "env": {
      "node": true
    },
    "rules": {
      "indent": ["error", 4],
      "semi": ["error", "always"],
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "ignore"
    }],
    }
};
