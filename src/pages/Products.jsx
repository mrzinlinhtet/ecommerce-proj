import Card from "../components/Card";
import { useStateContext } from "../context/StateContext"
import Spinner from "../components/Spinner/Spinner";

const Products = () => {
    const {state: {products, cart}} = useStateContext()
  // console.log(cart);
  return (
    <div className="flex flex-wrap gap-7 text-center my-10 justify-center">
        {products.length > 0 ? products?.map(product => <Card key={product.id} product={product}/>) : <Spinner />}
    </div>
  )
}

export default Products
