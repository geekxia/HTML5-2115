import { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { Upload, message } from 'antd'

// 关于Upload使用的坑：https://zhuanlan.zhihu.com/p/474392615

export default ({value,onChange}) => {

  const [fileList, setFileList] = useState([])

  useEffect(()=>{
    // 当value有值时，填充图片初始值
    if (value) {
      setFileList([
        { uid: Date.now(), thumbUrl: 'http://localhost:9999'+value }
      ])
    }
  }, [value])

  useEffect(()=>{
    // 监听setFileList这个异步操作成功
    // 如果set*成功，说明图片上传成功，要把有效的img回传给Form.Item进行双向绑定。
    if (fileList.length > 0) {
      const file = fileList[0]
      // console.log('---file', file)
      if (file.status === 'done') {
        const img = file.response.data.img
        onChange(img)
      }
    }
  }, [fileList])


  // 图片校验
  const validImg = (file, fileList) => {
    console.log('当前file', file)
    console.log('fileList', fileList)
    // 根据 file.size / file.type 判断图片大小和类型
    if (file.size / 1024 / 1024 > 1) {
      message.error('商品图片不能超过 1M')
      // 停止上传
      return false
    }
    return new Promise(resolve=>resolve(file))
  }

  // Upload组件的onChange事件
  const changeImg = ({fileList}) => {
    setFileList([...fileList])  // 异步的
  }

  // 图片删除事件
  const removeImg = file => {
    setFileList([])
    onChange('')
  }

  console.log('value', value)
  // 丢下一个问题：value和Upload的fileList无关，非受控！

  return (
    <ImgCrop rotate>
      {/* action是图片上传的接口地址 */}
      {/* name是后端接收图片数据的key名*/}
      {/* fileList用于受控的*/}
      <Upload
        action="http://localhost:8000/apix/v1/upload/img"
        name='good'
        listType="picture-card"
        maxCount={1}
        beforeUpload={validImg}
        onChange={changeImg}
        onRemove={removeImg}
        fileList={fileList}
      >
        {value ? '' : '+ Upload'}
      </Upload>
    </ImgCrop>
  )
}
