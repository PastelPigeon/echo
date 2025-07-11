import { getCurrentWindow } from "@tauri-apps/api/window";
import { ReactNode } from "react";

const appWindow = getCurrentWindow();

export default function Window(props: {children: ReactNode, title: string}){
  return(
    <div className="window" data-pb>
      <div className="title-bar" data-tauri-drag-region>
        <div className="left">
          <label className="title">{props.title}</label>
        </div>
        <div className="right">
          <button className="min-btn" onClick={() => appWindow.minimize()}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M2 3h20v18H2V3zm18 16V7H4v12h16zM8 12h8v2H8v-2z" fill="currentColor"/> </svg>
          </button>
          <button className="close-btn" onClick={() => appWindow.close()}>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M2 3h20v18H2V3zm18 16V7H4v12h16zM9 10h2v2H9v-2zm4 2h-2v2H9v2h2v-2h2v2h2v-2h-2v-2zm0 0v-2h2v2h-2z" fill="currentColor"/> </svg>
          </button>
        </div>
      </div>

      <div className="content" data-pb>
        {props.children}
      </div>
    </div>
  )
}