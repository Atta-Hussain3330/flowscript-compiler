import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "./App.css";

const App = () => {
  const [inputCode, setInputCode] = useState("");
  const [parsedCode, setParsedCode] = useState([]);
  const [programOutput, setProgramOutput] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const keywords = {
    Start: "keyword",
    End: "keyword",
    checkThis: "keyword",
    maybeThis: "keyword",
    otherwiseThis: "keyword",
    keepDoing: "keyword",
    repeatTimes: "keyword",
    stopNow: "keyword",
    nextRound: "keyword",
    show: "keyword",
    ask: "keyword",
    declare: "keyword",
    assign: "keyword",
    correct: "boolean",
    incorrect: "boolean",
    doThis: "keyword",
    runThis: "keyword",
    comment: "keyword",
  };

  const isKeyword = (value) => Object.keys(keywords).includes(value);

  const parseFlowScript = () => {
    const lines = inputCode.split("\n");
    const results = [];
    const output = [];
    const errors = [];

    let variableIdMap = {};
    let variableCount = 1;

    let inMultiLineComment = false;

    lines.forEach((line, index) => {
      let trimmedLine = line.trim();
      if (!trimmedLine) return;

      // Handle multiline comments
      if (inMultiLineComment) {
        if (/\*\//.test(trimmedLine)) {
          inMultiLineComment = false;
        }
        return;
      }

      if (/\/\*/.test(trimmedLine)) {
        inMultiLineComment = true;
        return;
      }

      // Handle single-line comments
      if (/\/\//.test(trimmedLine)) {
        trimmedLine = trimmedLine.split("//")[0].trim();
        if (!trimmedLine) return;
      }

      const regexTokens = /(\w+|\+|\-|\*|\/|\=|\;|\(|\)|,|\d+|\<|\>|\!|\"[^\"]*\"|\{|\})/g;
      const tokens = trimmedLine.match(regexTokens) || [];

      let processedTokens = new Set();
      let lineError = false;

      tokens.forEach((token) => {
        if (isKeyword(token)) {
          if (token === ";") {
            // Handle semicolon as 'semicolon'
            results.push({
              lineNumber: index + 1,
              classPart: "semicolon",  // Changed here to 'semicolon'
              valuePart: token,
            });
          } else {
            results.push({
              lineNumber: index + 1,
              classPart: token,
              valuePart: keywords[token],
            });
          }
          processedTokens.add(token);
        } else if (/^\d+$/.test(token)) {
          results.push({
            lineNumber: index + 1,
            classPart: "number",
            valuePart: token,
          });
          processedTokens.add(token);
        } else if (/^"[^"]*"$/.test(token)) {
          results.push({
            lineNumber: index + 1,
            classPart: "string",
            valuePart: token,
          });
          processedTokens.add(token);
        } else if (/^[a-zA-Z_]\w*$/.test(token)) {
          if (!variableIdMap[token]) {
            variableIdMap[token] = `id${variableCount}`;
            variableCount++;
          }
          results.push({
            lineNumber: index + 1,
            classPart: variableIdMap[token],
            valuePart: token,
          });
          processedTokens.add(token);
        } else if (/^[\+\-\*\/\=\<\>\!]$/.test(token)) {
          results.push({
            lineNumber: index + 1,
            classPart: "operator",
            valuePart: token,
          });
          processedTokens.add(token);
        } else if (/^[\;\(\)\,\{\}]$/.test(token)) {
          // If it's a semicolon, show as 'semicolon'
          if (token === ";") {
            results.push({
              lineNumber: index + 1,
              classPart: "semicolon",  // For semicolons, use 'semicolon' classPart
              valuePart: token,
            });
          } else {
            results.push({
              lineNumber: index + 1,
              classPart: "symbol",
              valuePart: token,
            });
          }
          processedTokens.add(token);
        } else {
          lineError = true;
        }
      });

      if (lineError) {
        errors.push(`Error on Line ${index + 1}: Invalid syntax or unrecognized token.`);
      } else {
        let lineOutput = `Line ${index + 1}`;
        results
          .filter((entry) => entry.lineNumber === index + 1)
          .forEach((entry) => {
            lineOutput += ` (${entry.classPart}, ${entry.valuePart})`;
          });
        output.push(lineOutput);
      }
    });

    setParsedCode(results);
    setProgramOutput(output);
    setErrorMessages(errors);
  };

  return (
    <div className="container">
      <h1>FlowScript Parser</h1>
      <div className="editor-container">
        <CodeMirror
          value={inputCode}
          options={{
            mode: "javascript",
            theme: "dracula",
            lineNumbers: true,
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => setInputCode(value)}
          className="code-editor"
        />
      </div>
      <button onClick={parseFlowScript} className="parse-button">
        Parse Code
      </button>

      {parsedCode.length > 0 && (
        <div className="output-container">
          <h3>Symbol Table</h3>
          <table>
            <thead>
              <tr>
                <th>Line Number</th>
                <th>Class Part</th>
                <th>Value Part</th>
              </tr>
            </thead>
            <tbody>
              {parsedCode.map((line, index) => (
                <tr key={index}>
                  <td>{line.lineNumber}</td>
                  <td>{line.classPart}</td>
                  <td>{line.valuePart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {programOutput.length > 0 && (
        <div className="output-container">
          <h3>Token List</h3>
          <div className="output-messages">
            {programOutput.map((output, index) => (
              <div key={index} className="output-message">
                {output}
              </div>
            ))}
          </div>
        </div>
      )}

      {errorMessages.length > 0 && (
        <div className="error-container">
          <h3>Error Messages</h3>
          <div className="error-messages">
            {errorMessages.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
