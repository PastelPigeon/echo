import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type AddedTemplatesContextType = {
  add: (url: string) => void
  remove: (url: string) => void
  addedTemplates: string[]
}

const AddedTemplatesContext = createContext<AddedTemplatesContextType | null>(null)

function AddedTemplatesProvider(props: {children: ReactNode}){
  // 初始化addedTemplates
  const [addedTemplates, setAddedTemplates] = useState<string[]>(JSON.parse(localStorage.getItem("addedTemplates") || JSON.stringify([])))

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
  }

  // 删除模板
  const remove = (url: string) => {
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