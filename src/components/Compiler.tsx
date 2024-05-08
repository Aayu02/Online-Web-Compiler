import CodeEditor from "./CodeEditor"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import HelperHeader from "./HelperHeader"
import RenderCode from "./RenderCode"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { handleError } from "@/utils/handleError"
import { updateFullCode } from "@/redux/slices/compilerSlice"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export const Compiler = () => {
  const { urlId } = useParams();
  const dispatch = useDispatch();
  const loadCode = async () => {
    try {
      const response = await axios.post("http://localhost:4000/compiler/load",{
        urlId: urlId
      });
     dispatch(updateFullCode(response.data.fullCode));
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        if(error?.response?.status === 500){
          toast("Invalid URL, Default Code Loaded");
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if(urlId){
      loadCode();
    }
  },[urlId])
  
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
        <HelperHeader/>
        <CodeEditor/>
        </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}><RenderCode/></ResizablePanel>
    </ResizablePanelGroup>
  )
}
