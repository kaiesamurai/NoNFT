module.exports = function consoleLog({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (
          path.node.callee.type === "MemberExpression" &&
          path.node.callee.object.type === "Identifier" &&
          path.node.callee.object.name === "console" &&
          path.node.callee.property.type === "Identifier" &&
          path.node.callee.property.name === "log"
        ) {
          const functionName = path.findParent(
            (p) =>
              p.node.type === "FunctionDeclaration" ||
              p.node.type === "FunctionExpression"
          )?.node.id?.name;
          if (functionName) {
            path.node.arguments.unshift(t.stringLiteral(`[${functionName}] `));
          }
        }
      },
    },
  };
};
// This is not working at the moment.
// It was an attempt to modify the console.log behavior to output the function or component name before each log.
// FunctionDeclaration and FunctionExpression could be replaced with JSXOpeningElement and JSXIdentifier.
// this is required - npm install --save-dev @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-plugin-macros
