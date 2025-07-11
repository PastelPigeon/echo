import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useSelectedTemplate } from "./useSelectedTemplate"

type AddedTemplatesContextType = {
  add: (url: string) => void
  remove: (url: string) => void
  addedTemplates: string[]
}

const AddedTemplatesContext = createContext<AddedTemplatesContextType | null>(null)

function AddedTemplatesProvider(props: {children: ReactNode}){
  // 初始化addedTemplates
  const [addedTemplates, setAddedTemplates] = useState<string[]>(JSON.parse(localStorage.getItem("addedTemplates") || JSON.stringify([])))

  // 添加选中的模板的引用来处理特殊情况
  const { switchSelectedTemplate } = useSelectedTemplate()

  // 同步localStorage和addedTemplates
  useEffect(() => {
    // 如果本地存储未初始化，先初始化
    if (localStorage.getItem("addedTemplates") == null){
      localStorage.setItem("addedTemplates", JSON.stringify([]))
    }

    // 设置localStorage
    localStorage.setItem("addedTemplates", JSON.stringify(addedTemplates))
  }, [addedTemplates])

  // 添加模板
  const add = (url: string) => {
    setAddedTemplates(
      [
        ...addedTemplates,
        url
      ]
    )

    // 当添加模板时，自动将选中的模板设置到新加的模板
    switchSelectedTemplate(url)
  }

  // 删除模板
  const remove = (url: string) => {
    // 当删除模板时，自动将选中的模板切换到指定删除模板的上一个模板
    if (addedTemplates.indexOf(url) != 0){
      switchSelectedTemplate(addedTemplates[addedTemplates.indexOf(url) - 1])
    } else {
      switchSelectedTemplate("")
    }

    setAddedTemplates(
      addedTemplates.filter((addedTemplate: string) => {addedTemplate != url})
    )
  }

  const contextValue = {
    addedTemplates,
    add,
    remove
  }

  return(
    <AddedTemplatesContext.Provider value={contextValue}>
      {props.children}
    </AddedTemplatesContext.Provider>
  )
}

function useAddedTemplates(){
  const context = useContext(AddedTemplatesContext);
  if (!context) {
    throw new Error('useAddedTemplates must be used within a AddedTemplatesProvider');
  }
  return context;
};

export { AddedTemplatesProvider, useAddedTemplates }