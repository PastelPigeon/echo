import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAddedTemplates } from "./useAddedTemplates"
import { fetch } from "@tauri-apps/plugin-http"

type TemplateInfoType = {
  name: string
  description: string
  version: string
  icon: string
}

type AddedTemplatesInfoType = {
  url: string
  info: TemplateInfoType | null
  isLoading: boolean
}[]

type AddedTemplatesInfoContextType = {
  addedTemplatesInfo: AddedTemplatesInfoType
}

const AddedTemplatesInfoContext = createContext<AddedTemplatesInfoContextType | null>(null)

function AddedTemplatesInfoProvider(props: {children: ReactNode}){
  const [addedTemplatesInfo, setAddedTemplatesInfo] = useState<AddedTemplatesInfoType>([])

  // 获取已经安装的模板数据
  const { addedTemplates } = useAddedTemplates()

  // 获取指定模板的数据
  const getTemplateInfoFromURL = async (templateURL: string) => {

    // 请求数据
    const response = await (await fetch(templateURL)).json()

    // 格式化返回的数据为TemplateInfoType
    const info = {
      name: response.name,
      description: response.description,
      version: response.version,
      icon: response.icon
    }
      
    setAddedTemplatesInfo(prev => {
      // 深度拷贝addedTemplatesInfo
      let addedTemplatesInfoTemp: AddedTemplatesInfoType = JSON.parse(JSON.stringify(prev))

      // 删除所对应的原始内容
      addedTemplatesInfoTemp = addedTemplatesInfoTemp.filter((addedTemplateInfo) => {addedTemplateInfo.url != templateURL})

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

  // 实时更新info
  useEffect(() => {

    // 初始化addedTemplatesInfo
    setAddedTemplatesInfo(
      addedTemplates.map((addedTemplate) => {
        return(
          {
            url: addedTemplate,
            info: null,
            isLoading: true
          }
        )
      })
    )

    // 发起获取信息请求
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

export { useAddedTemplatesInfo, AddedTemplatesInfoProvider }