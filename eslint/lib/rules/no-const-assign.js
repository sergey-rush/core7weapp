/**
 * @fileoverview A rule to disallow modifying variables that are declared using `const`
 * @author Toru Nagashima
 */

"use strict";

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "Disallow reassigning `const` variables",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-const-assign"
        },

        schema: [],

        messages: {
            const: "'{{name}}' is constant."
        }
    },

    create(context) {

        const sourceCode = context.getSourceCode();

        /**
         * Finds and reports references that are non initializer and writable.
         * @param {Variable} variable A variable to check.
         * @returns {void}
         */
        function checkVariable(variable) {
            astUtils.getModifyingReferences(variable.references).forEach(reference => {
                context.report({ node: reference.identifier, messageId: "const", data: { name: reference.identifier.name } });
            });
        }

        return {
            VariableDeclaration(node) {
                if (node.kind === "const") {
                    sourceCode.getDeclaredVariables(node).forEach(checkVariable);
                }
            }
        };

    }
};