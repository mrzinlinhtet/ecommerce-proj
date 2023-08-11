import {AiFillStar} from 'react-icons/ai'
const Card = ({product}) => {

  return (
    <div className="w-72 border-2 rounded-lg p-5 hover:shadow-xl transform transition hover:scale-105" >
      <img src={product?.image} className="h-[200px] w-[200px] rounded-md my-3 px-5 py-2 mx-auto" alt="" />
      <h3 className='text-header font-bold tracking-wider my-3'>{product?.title?.substring(0,20)}</h3>
      <div className='flex items-center justify-center gap-2'>
        <AiFillStar className='text-danger' />
        <small className='text-info font-semibold'>({product?.rating.rate})</small>
      </div>
      <p className='text-secondary text-xl my-3'>$ {product?.price}</p>
      <div>
        <button className='bg-info text-primary px-5 py-2 rounded shadow-lg transform transition hover:scale-90'>Add to cart</button>
        <button className='bg-header text-primary px-5 py-2 rounded shadow-lg ml-3 transform transition hover:scale-90'>Detail</button>
      </div>
    </div>
  )
}

export default Card
