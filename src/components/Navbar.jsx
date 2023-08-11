import { SiShopify } from "react-icons/si";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom"
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
    const {search, setSearch} = useStateContext()
  return (
    <nav className="flex justify-between items-center px-5 py-2 my-5 rounded bg-gray-50 shadow-md">
      <Link to={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <SiShopify className="text-4xl text-danger" />
          <h1 className="uppercase text-2xl tracking-wider font-semibold text-header">
            gamani-shop
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-header text-white px-4 py-2 rounded">
          <FaShoppingCart className="text-xl" />
          <small className="text-xs text-white">0</small>
        </div>
        <div className="flex gap-2 items-center border-2 rounded px-3 py-2">
          <FaSearch />
          <input value={search} onChange={(e)=>setSearch(e.target.value)} 
            type="text"
            className="outline-none bg-transparent"
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
