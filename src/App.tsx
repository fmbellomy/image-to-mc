import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { appWindow } from "@tauri-apps/api/window";
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const image_frame_style = {
    boxShadow: '0 0 10px var(--ctp-mocha-mauve)',
    width: '40vw',
    height: '40vh',
    gridRow: '1'
  }
  const image_style = {
    width: 'inherit',
    height: 'inherit'
  }
  const grid_style = {
    paddingTop: '5vh',
    display: 'grid',
    justifyContent: 'center',
    gridColumnGap: '7.5vw'
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }
  document
    .getElementById("titlebar-minimize")?.addEventListener("click", () => appWindow.minimize());
  document
    .getElementById("titlebar-maximize")?.addEventListener("click", () => appWindow.toggleMaximize());
  document
    .getElementById("titlebar-close")?.addEventListener("click", () => appWindow.close());
  return (

    <div data-tauri-drag-region className="container">
      <h1>Image to MC</h1>
      <div className="grid" style={grid_style}>

        <div className="image_frame" id="drop_zone" onDrop={(event) => {
          event.preventDefault(); event.stopPropagation(); for (const f of event.dataTransfer.files) {
            setImage(URL.createObjectURL(f));
            console.log('filename of dragged file: ', f.name);
          }
        }} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} style={image_frame_style}>
          <img src={image} style={image_style}></img>

        </div>
        <div className="image_frame" id="preview" style={image_frame_style}>

        </div>

      </div>
    </div >
  );
}

export default App;
