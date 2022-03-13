// 学习TS类型

// 冒号前面是变量名称，冒号后面是类型。
const a: string = 'hello'
const b: number = 100
const c: boolean = true
// 定义数组有两种语法
const d: Array<number> = [1,2,3,4]
const e: string[] = ['a','b']
const f: object = { a:1, b:2, c:6 }
// any表示任何类型，工作中any可以救命，所以很多人戏称TS是AnyScript
const g: any = '你好'
// 元组，是一种每个位置都指定了类型的数组。
// 元组的长度是固定的，访问元组中的元素和数组语法是一样的。
const h: [string, number] = ['a', 1] // h[0]  h[1]
const i: [any, any] = [1, true]
// 二维数组
const j: Array<number[]> = [[1,2], [3,4,5], [5,6]]
const k: string[][] = [['a'], ['b','c'], ['d']]

// interface自定义类型，命名要求一般大写
// 你可以把自定义类型，理解成一个变量的“形状”。
// 在React开发中，常用Props验证。
interface Man {
  name: string, // 不带?的，是必有属性
  role: string,
  age: number,
  addr?: string, // ? 可选
  readonly gender?: boolean,  // readonly 表示只读
  [propName:string]: any,  // 扩展类型
  run: (arg:number)=>string  // 函数类型
}

const xf: Man = {
  name: '小枫',
  role: 'qf',
  age: 20,
  addr: '广东深圳',
  gender: true,
  mobile: '110',
  level: '本科',
  run: (arg:number) =>(arg+'')
}

// 泛型：定义时给个占位符，使用时才给具体的类型。
function use<T>(a:T): void {
  console.log('a的类型是', typeof a)
}
use<number>(100)  // number
use<boolean>(true)
use<Array<any>>([1,'a'])

// type别名，给复杂类型取个名字
// 类型联合
type A = string | number | boolean
const a1: A = true
const a2: A = 200

interface People {
  work: string,
  compony: string
}
// 类型交叉
type B =  Man & People
const zl: B = {
  name: '张亮',
  role: 'editor',
  age: 20,
  run: (a:number)=>(a+'100'),
  work: '前端工程师',
  compony: '百度'
}

// 枚举：数量有限且不重复的一组键值对
// 开发中，在那些中英文键值对，使用枚举
enum Cate {
  office = '办公用品',
  car = '汽车用品',
  sport = '户外运动'
}
console.log('car', Cate.car)  // ‘汽车用品’
// const cc: string = 'sport'
const cc = 'sport'
console.log('car', Cate[cc])  // ‘汽车用品’

const GoodRow = (props: Good) => (
  <div>一行商品数据</div>
)

import { useState, useEffect } from 'react'

export default () => {

  // 定义一个商品数组
  // 在TS中，<T> 表示“泛型”
  const [list, setList] = useState<Array<Good>>([])
  const [count, setCount] = useState<number>(100)

  useEffect(()=>{
    setList([
      { id: 1, name:'手机', desc:'手机', price: 200, hot: true },
      { id: 2, name:'手机', desc:'手机', price: 200, hot: false }
    ])
  }, [])


  return (
    <>
      <h1>商品表单</h1>
      {
        list.map(ele=>(
          <GoodRow key={ele.id} {...ele} />
        ))
      }
    </>
  )
}
