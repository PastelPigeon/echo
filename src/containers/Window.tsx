import { getCurrentWindow } from "@tauri-apps/api/window";
import { ReactNode } from "react";
import WrappedButton from "./WrappedButton";

const appWindow = getCurrentWindow();

export default function Window(props: {children: ReactNode, title: string}){
  return(
    <div className="window" data-pb>
      <div className="title-bar" data-tauri-drag-region>
        <div className="left">
          <label className="title">{props.title}</label>
        </div>
        <div className="right">
          <WrappedButton className="min-btn" onClick={() => appWindow.minimize()} data-pb>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M4 11h16v2H4z"/> </svg>
          </WrappedButton>
          <WrappedButton className="close-btn" onClick={() => appWindow.close()} data-pb>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z" fill="currentColor"/> </svg>
          </WrappedButton>
        </div>
      </div>

      <div className="content" data-pb>
        {props.children}
      </div>
    </div>
  )
}