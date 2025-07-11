import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type SelectedTemplateContextType = {
  selectedTemplate: string
  switchSelectedTemplate: (targetTemplateURL: string) => void
}

const SelectedTemplateContext = createContext<SelectedTemplateContextType | null>(null)

function SelectedTemplateProvider(props: {children: ReactNode}){
  const [selectedTemplate, setSelectedTemplate] = useState<string>(localStorage.getItem("selectedTemplate") || "")

  // 同步
  useEffect(() => {
    if (localStorage.getItem("selectedTemplate") == null){
      localStorage.setItem("selectedTemplate", "")
    }

    localStorage.setItem("selectedTemplate", selectedTemplate)
  })

  const switchSelectedTemplate = (targetTemplateURL: string) => {
    setSelectedTemplate(targetTemplateURL)
  }

  const contextValue = {
    selectedTemplate,
    switchSelectedTemplate
  }

  return(
    <SelectedTemplateContext.Provider value={contextValue}>
      {props.children}
    </SelectedTemplateContext.Provider>
  )
}

function useSelectedTemplate(){
  const context = useContext(SelectedTemplateContext);
  if (!context) {
    throw new Error('useSelectedTemplate must be used within a SelectedTemplateProvider');
  }
  return context;
};

export { SelectedTemplateProvider, useSelectedTemplate }