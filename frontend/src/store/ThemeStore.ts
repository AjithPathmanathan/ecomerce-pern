import {create} from 'zustand'
interface ThemeStore {
    themeColor: string;
  setThemeColor: (themeColor: string) => void; // Define type for setTheme
}

export const useThemeStore = create((set)=>({
    themeColor:localStorage.getItem('prefered-theme')|| "forest",
    setThemeColor:(themeColor:string)=>{
        localStorage.setItem('prefered-theme',themeColor)
        set({themeColor})}
}))