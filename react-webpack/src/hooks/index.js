import { useContext, useEffect } from 'react'
import ThemeContext from '@/utils/theme'

const useTheme = () => {
  const theme = useContext(ThemeContext)
  // do something
  return theme
}

// 这是语言包
const lang = {
  zh: {
    tip: '欢迎来到千锋',
    msg: 'HTML5前端开发'
  },
  en: {
    tip: 'Welcome to QianFeng',
    msg: 'HTML5 Front Development'
  }
}

const useLang = () => {
  // 来自状态管理所保存的语言标识
  const current = 'zh'
  // do something
  return lang[current]
}

const useTitle = (title) => {
  console.log('title', title)
  useEffect(()=>{
    document.title = title || '千锋'
  }, [])
}

export {
  useTheme,
  useLang,
  useTitle
}
