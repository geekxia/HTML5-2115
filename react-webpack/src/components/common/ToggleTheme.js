import React from 'react'

export default (props) => {
  const { theme, onChange } = props
  const change = ev => {
    const key = ev.target.dataset.key
    onChange({...theme, [key]: ev.target.value})
  }
  return (
    <div>
      前景色：
      <input
        type="color"
        value={theme.color}
        data-key='color'
        onChange={change}
      />
      背景色：
      <input
        type="color"
        value={theme.background}
        data-key='background'
        onChange={change}
      />
    </div>
  )
}
