
interface Good {
    name: string,
    desc: string,
    price: number,
    hot: boolean,
    [propName:string]: any
}

interface ModalProps {
    title: string,
    tip?: boolean
}
  