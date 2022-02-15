import { useLocation } from 'react-router-dom'

export function CurrentPath(){
    const location = useLocation();
    return location.pathname;
}

//highlight current path's matching button
export const handleActive = (path)=>{
    return CurrentPath()===path? {boxShadow: "#fffefcf8 0px 0px 30px 5px", backgroundColor:"#fff5d3c5"}:null
  }