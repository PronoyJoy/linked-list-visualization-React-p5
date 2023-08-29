import React, { useState } from "react";
import { LinkedList } from './LinkedList/LinkedList';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import './App.css';


function App() {
  const [linkedList] = useState(new LinkedList());
  const [inputData, setInputData] = useState("");
  const [displayData, setDisplayData] = useState("");
  const [foundNode, setFoundNode] = useState(null);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [ableDelete, setableDelete] = useState(null)

  const sketch = (p5) => {
    let targetX = 50;
    let currentX = 50;

    p5.setup = () => {
      p5.createCanvas(800, 400);
      p5.background(220);
    };

    p5.draw = () => {
      p5.background(220);
      let current = linkedList.head;
      const y = p5.height / 2;
      const boxWidth = 60;
      const boxHeight = 30;

      currentX = targetX; // Reset the starting x position

      while (current) {
        if (current === foundNode) {
          p5.fill(0, 255, 0);
        } else {
          p5.fill(255);
        }
        p5.stroke(0);
        p5.rect(currentX, y - boxHeight / 2, boxWidth, boxHeight);
        p5.fill(0);
        p5.noStroke();
        p5.text(current.data, currentX + 20, y);
        current = current.next;
        currentX += boxWidth + 20; // Move x position for the next box
      }

      if (foundNode === false) {
        p5.fill(255, 0, 0);
        p5.text("Node not found!", p5.width / 2, p5.height - 50);
      }


      if (ableDelete === false) {
        p5.fill(255, 0, 0);
        p5.text("Node not found! How Can I Delete", p5.width / 2, p5.height - 50);
      }
    };

  };


  const addNode = () => {
    linkedList.add(inputData);
    setInputData("");
    displayNodes();
    setCodeSnippet(`Added node with data: ${inputData}`);
  };

  const deleteNode = () => {
    const wasDeleted = linkedList.delete(inputData);
    if (wasDeleted) {
      setCodeSnippet(`Deleted node with data: ${inputData}`);
    } else {
      setableDelete(false);
      setCodeSnippet(`Node with data ${inputData} does not exist.`);
    }
    setInputData("");
    displayNodes();
  };

  const findNode = () => {
    const node = linkedList.find(inputData);
    if (node) {
      setFoundNode(node);
      setCodeSnippet(`Found node with data: ${inputData}`);
    } else {
      setFoundNode(false);
      setCodeSnippet(`Node with data ${inputData} not found.`);
    }
    setInputData("");
  };

  const displayNodes = () => {
    const listString = linkedList.display();
    setDisplayData(listString);
  };

  return (
    <div className="App">
      <h1>Linked List Visualization</h1>
      <h2>

     

      </h2>
      <div id="code-panel">
        <pre>{codeSnippet}</pre>
      </div>
      <div id="control-panel">
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter data"
        />
        <button className="btn" onClick={addNode}>Add Node</button>
        <button className="btn" onClick={deleteNode}>Delete Node</button>
        <button className="btn" onClick={findNode}>Find Node</button>
      </div>
      <div id="canvas-area">
        <div className="textual-representation">{displayData}</div>
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}

export default App;
