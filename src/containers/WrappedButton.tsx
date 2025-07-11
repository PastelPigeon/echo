import { MouseEventHandler, ReactNode } from "react";

export default function WrappedButton(props: {children: ReactNode, className: string, onClick: MouseEventHandler<HTMLButtonElement>}){
  return(
    <div className="button-wrapper" data-pb>
      <button className={props.className} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  )
}