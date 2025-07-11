import { ReactNode } from "react";
import { SelectedTemplateProvider } from "../hooks/useSelectedTemplate";
import { AddedTemplatesInfoProvider } from "../hooks/useAddedTemplatesInfo";
import { SelectedTemplateInfoProvider } from "../hooks/useSelectedTemplateInfo";
import { AddedTemplatesProvider } from "../hooks/useAddedTemplates";

export default function Providers(props: {children: ReactNode}){
  return(
    <SelectedTemplateProvider>
      <AddedTemplatesProvider>
        <SelectedTemplateInfoProvider>
          <AddedTemplatesInfoProvider>
            {props.children}
          </AddedTemplatesInfoProvider>
        </SelectedTemplateInfoProvider>
      </AddedTemplatesProvider>
    </SelectedTemplateProvider>
  )
}