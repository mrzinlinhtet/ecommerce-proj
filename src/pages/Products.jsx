import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useStateContext } from "../context/StateContext"

const Products = () => {
    const {state: {productList} , search} = useStateContext()
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(productList)
        // const filterData = productList?.filter(product => product.title.toLowerCase().includes(search.toLowerCase())
    },[productList], search);

    // console.log(products);
  return (
    <div className="flex flex-wrap gap-7 text-center my-10 justify-center">
        {products?.map(product => <Card key={product.id} product={product}/>)}
    </div>
  )
}

export default Products
