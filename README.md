# FlowScript Parser

This project is a simple web application that parses a custom programming language, **FlowScript**, and highlights its tokens. FlowScript is a fictional language designed to have a readable, easy-to-understand syntax, and it is parsed into a JavaScript-like structure for further processing.

## Features

- **Custom Syntax Parsing:** The app supports parsing specific keywords, loops, conditionals, input/output, and other constructs in FlowScript.
- **Code Highlighting:** It uses **CodeMirror** for real-time code editing with syntax highlighting for FlowScript.
- **Symbol Table:** It generates a symbol table to display the line-by-line breakdown of keywords, variables, and values.
- **Error Handling:** Displays error messages for unrecognized tokens and invalid syntax.
- **Token List:** Shows a list of all tokens in the program with their classification (e.g., keyword, number, variable, etc.).

## Keywords

Here’s a breakdown of the keywords used in **FlowScript**:

### Conditionals:
- `checkThis` = `'if'`
- `maybeThis` = `'else if'`
- `otherwiseThis` = `'else'`

### Loops:
- `keepDoing` = `'while'`
- `repeatTimes` = `'for'`
- `stopNow` = `'break'`
- `nextRound` = `'continue'`

### Input/Output:
- `show` = `'console.log'` (used for printing output)
- `ask` = `'prompt'` (used to get user input)

### Variable Declaration and Assignment:
- `declare` = `'let'` or `'const'` (for variable declaration)
- `assign` = `'='` (assignment operator)

### Boolean Values:
- `correct` = `'true'`
- `incorrect` = `'false'`

### Functions:
- `doThis` = `'function'` (used to define a function)
- `runThis` = `'call'` (used to call a function)

### Comments:
- `comment` = `'//'` (single-line comments)
- `comment` = `'/**/'` (multi-line comments)

