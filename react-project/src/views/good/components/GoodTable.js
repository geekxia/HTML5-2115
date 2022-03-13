
import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Table, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import GoodTableHeader from './GoodTableHeader'

import { goodList, delGood } from '@/store/actions'

const style = { margin: '25px 0', background: 'white' }
const { confirm } = Modal

// 商品表格组件
export default props => {

  // 来自父组件传递过来的查询参数
  const { params } = props
  const [pagination, setPagination] = useState({page:1,size:2})
  const [ids, setIds] = useState([])
  const [count, setCount] = useState(0)

  const history = useHistory()

  const dispatch = useDispatch()
  const { total, list, cates, done } = useSelector(state=>state.good)


  // 当搜索时、当品类变化时，我们要把page=1
  // limit(size).skip((page-1)*size)
  useEffect(()=>{
    setPagination({...pagination, page:1})
  }, [params])

  useEffect(()=>{
    dispatch(goodList({...params, ...pagination}))
  }, [params, pagination, count])

  useEffect(()=>{
    if (done>0) {
      setCount(count+1)
    }
    return () => {
      dispatch({type:'good/done',payload:0})
    }
  }, [done])

  const skipToEdit = row => {
    console.log('当前行', row)
    // 路由跳转到编辑页，并且传递商品id（query传参、动态路由）
    history.push('/good/edit/'+row._id)
  }

  const mulRomove = () => {
    console.log('批量删除', ids)
    // 注意：向后端传递参数，如果数组一般都需要拼接成字符串。
    // ids 是由多个_id，用;拼接而成的字符串。
  }

  const rowRemove = row => {
    console.log('删除行', row._id)
    confirm({
      title: `你确定要删除 ${row.name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      content: `${row.desc}`,
      onOk () {
        // 删除操作是异步的
        dispatch(delGood(row._id))
        // 删除成功，刷新表格
      }
    })
  }

  // 定义表格的“列”
  const columns = useMemo(()=>(
    [
      {
        title: '商品',
        dataIndex: 'name',
        align: 'center',
        render: (text, row, idx) => {
          return (
            <div className='good'>
              <img src={'http://localhost:9999'+row.img} alt=""/>
              <div>{ text }</div>
            </div>
          )
        }
      },
      {
        title: '价格',
        align: 'center',
        dataIndex: 'price',
        render: text => ('￥'+text.toFixed(2)),
        sorter: (a, b) => {
          // console.log('a', a, 'b', b)
          return a.price - b.price
        }
      },
      {
        title: '品类',
        dataIndex: 'cate',
        align: 'center',
        render: cate => {
          // 处理品类的中英文显示
          if (cates.length > 0) {
            const result = cates.find(ele=>ele.cate===cate)
            console.log('result', result)
            return result.cate_zh
          } else {
            return ''
          }
        }
      },
      {
        title: '是否热销',
        dataIndex: 'hot',
        align: 'center',
        render: text => (text ? '是' : '否')
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        render: text => {
          switch (text) {
            case 1:
              return '正常'
            case 0:
              return '已下架'
            default:
              return '未知状态'
          }
        }
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        align: 'center',
        render: (text) => {
          // 把时间戳(Number)变成moment对象
          const m = moment(text)
          return (
            <>
              <div>{m.format('MM月DD日')}</div>
              <div>{m.format('HH:mm')}</div>
            </>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'handle',
        align: 'center',
        render: (_, row) => (
          <>
            <Button
              danger
              size='small'
              onClick={()=>rowRemove(row)}
            >
              删除
            </Button>
            <Button
              style={{marginLeft:'10px'}}
              type="primary"
              size='small'
              onClick={()=>skipToEdit(row)}
            >
              编辑
            </Button>
          </>
        )
      }
    ]
  ), [cates])

  return (
    <div style={style}>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: ids=>setIds(ids)
        }}
        columns={columns}
        dataSource={list}
        rowKey='_id'
        pagination={{
          total,
          showTotal: (total,range) => (`第${range[0]}-${range[1]}条/总共${total}条`),
          defaultPageSize: pagination.size,
          pageSizeOptions: [2,5,10,20],
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page,size)=>setPagination({page,size}),
          current: pagination.page,
        }}
        title={curPageData=>{
          console.log('自定义表格的Title', curPageData)
          return <GoodTableHeader />
        }}
        onRow={row=>({
          // onClick: ()=>console.log('点击了行', row)
        })}
        footer={()=>(
          <Button
            danger
            disabled={ids.length===0}
            onClick={mulRomove}
          >批量删除</Button>
        )}
      />
    </div>
  )
}
