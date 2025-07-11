import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useSelectedTemplate } from "./useSelectedTemplate"
import { fetch } from "@tauri-apps/plugin-http"

type SelectedTemplateInfoType = {
  fullInfo: {
    name: string
    description: string
    version: string
    icon: string
    html: string
    requestSchema: string
    exampleRequest: string
  }
  requestSchemaContent: string
  exampleRequestContent: string
}

type SelectedTemplateInfoContextType = {
  selectedTemplateInfo: SelectedTemplateInfoType | null
  isLoading: boolean
}

const SelectedTemplateInfoContext = createContext<SelectedTemplateInfoContextType | null>(null)

function SelectedTemplateInfoProvider(props: {children: ReactNode}){
  const [selectedTemplateInfo, setSelectedTemplateInfo] = useState<SelectedTemplateInfoType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // 获取当前选中的模板
  const { selectedTemplate } = useSelectedTemplate()

  const updateSelectedTemplateInfo = async () => {
    const fullInfo = await (await fetch(selectedTemplate)).json()
    const requestSchemaContent = await (await fetch(fullInfo.requestSchema)).json()
    const exampleRequestContent = await (await fetch(fullInfo.exampleRequest)).json()

    setSelectedTemplateInfo(
      {
        fullInfo: fullInfo,
        requestSchemaContent: requestSchemaContent,
        exampleRequestContent: exampleRequestContent
      }
    )

    setIsLoading(false)
  }

  // 实时更新info
  useEffect(() => {
    setIsLoading(true)
    if (selectedTemplate != ""){
      updateSelectedTemplateInfo()
    }
  }, [selectedTemplate])

  const contextValue = {
    selectedTemplateInfo,
    isLoading
  }

  return(
    <SelectedTemplateInfoContext.Provider value={contextValue}>
      {props.children}
    </SelectedTemplateInfoContext.Provider>
  )
}

function useSelectedTemplateInfo(){
  const context = useContext(SelectedTemplateInfoContext);
  if (!context) {
    throw new Error('useSelectedTemplateInfo must be used within a SelectedTemplateInfoProvider');
  }
  return context;
};

export { useSelectedTemplateInfo, SelectedTemplateInfoProvider }