import { PaletteIcon } from "lucide-react"
import {THEMES} from '../constants/index'
import { useThemeStore } from "../store/ThemeStore"
const ThemeSelector = () => {
    const {themeColor,setThemeColor} = useThemeStore() ;
  return (
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">
  <PaletteIcon/>
  </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {THEMES.map((theme)=>{
        return(<button onClick={()=>setThemeColor(theme.name)} key={theme.name} className={`rounded-xl items-center gap-2 flex ${
        themeColor===theme.name
        ? "bg-primary/10 text-primary"
                    : "hover:bg-base-content/5"}
       
     `}>
            <PaletteIcon/>
            {theme.name} 
            <div className="ml-auto flex gap-1">
              {theme.colors.map((color, i) => (
                <span key={i} className="size-2 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
            </button>)
    })}
  </ul>
</div>
  )
}

export default ThemeSelector