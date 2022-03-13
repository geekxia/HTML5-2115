
export function fetchUser(parmas) {
  console.log('parmas', parmas)
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve({username:'张三',role:'admin',...parmas})
    },200)
  })
}
