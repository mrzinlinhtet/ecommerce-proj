import Card from "../components/Card";
import { useStateContext } from "../context/StateContext"

const Products = () => {
    const {state: {products, cart}} = useStateContext()
  console.log(cart);
  return (
    <div className="flex flex-wrap gap-7 text-center my-10 justify-center">
        {products?.map(product => <Card key={product.id} product={product}/>)}
    </div>
  )
}

export default Products
