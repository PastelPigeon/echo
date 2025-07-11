import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAddedTemplates } from "./useAddedTemplates"
import { fetch } from "@tauri-apps/plugin-http"

type TemplateInfoType = {
  name: string,
  description: string,
  version: string,
  icon: string
}

type AddedTemplatesInfoType = {
  url: string,
  info: TemplateInfoType | null,
  isLoading: boolean
}[]

type AddedTemplatesInfoContextType = {
  addedTemplatesInfo: AddedTemplatesInfoType
}

const AddedTemplatesInfoContext = createContext<AddedTemplatesInfoContextType | null>(null)

function AddedTemplatesInfoProvider(props: {children: ReactNode}){
  const [addedTemplatesInfo, setAddedTemplatesInfo] = useState<AddedTemplatesInfoType>([])

  // 添加对addedTemplates的引用
  const { addedTemplates } = useAddedTemplates()

  // 获取模板信息
  const getTemplateInfoFromURL = async (templateURL: string) => {
    const response = await (await fetch(templateURL)).json()

    const info = {
      name: response.name,
      description: response.description,
      version: response.version,
      icon: response.icon
    }

    setAddedTemplatesInfo((prev) => {
      // 深度拷贝addedTemplatesInfo
      let addedTemplatesInfoTemp: AddedTemplatesInfoType = JSON.parse(JSON.stringify(prev))

      // 删除原有的数据
      addedTemplatesInfoTemp = addedTemplatesInfoTemp.filter((addedTemplateInfo) => {addedTemplateInfo.url != templateURL})

      // 添加新的数据
      addedTemplatesInfoTemp.push(
        {
          url: templateURL,
          info: info,
          isLoading: false
        }
      )

      return addedTemplatesInfoTemp
    })
  }

  // 自动更新数据
  useEffect(() => {
    // 初始化addedTemplatesInfo
    const initialValue = addedTemplates.map((addedTemplate) => {
      return(
        {
          url: addedTemplate,
          info: null,
          isLoading: true
        }
      )
    })

    setAddedTemplatesInfo(initialValue)

    // 发起请求
    addedTemplates.forEach((addedTemplate) => {
      getTemplateInfoFromURL(addedTemplate)
    })
  }, [addedTemplates])

  const contextValue = {
    addedTemplatesInfo
  }

  return(
    <AddedTemplatesInfoContext.Provider value={contextValue}>
      {props.children}
    </AddedTemplatesInfoContext.Provider>
  )
}

function useAddedTemplatesInfo(){
  const context = useContext(AddedTemplatesInfoContext);
  if (!context) {
    throw new Error('useAddedTemplatesInfo must be used within a AddedTemplatesInfoProvider');
  }
  return context;
};

export { AddedTemplatesInfoProvider, useAddedTemplatesInfo }