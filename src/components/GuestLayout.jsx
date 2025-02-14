import {useState, useEffect} from "react";
import {Outlet, Navigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  setQuery,
  setSelectedCategory,
  fetchCategories,
} from "../app/slices/productSlice";
import logoImg from "../assets/logo.png";

export default function GuestLayout() {
  const dispatch = useDispatch();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const {query, categories} = useSelector(state => state.product);
  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (token) {
    return <Navigate to="/" />;
  }

  const selectCategory = id => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      <nav className="p-2 flex flex-col lg:flex-row justify-between bg-tomato h-14 w-full sticky z-20 top-0 lg:h-16 text-beige">
        <div className="hidden lg:flex justify-between">
          <Link to="/public" className="flex gap-2 items-center">
            <img src={logoImg} width="40" />
            <p className="lg:text-xl font-medium">Mitsuri Food</p>
          </Link>
        </div>
        <div className="flex">
          <ul className="flex items-center justify-between w-full">
            <li
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="hidden lg:flex gap-3 items-center cursor-pointer"
            >
              <button className="cursor-pointer font-medium flex items-center gap-4">
                <i className="fa-solid fa-chevron-down"></i>
                <span>Category</span>
              </button>
            </li>
            <div
              className={`${
                categoryOpen ? "absolute" : "hidden"
              } rounded-md shadow-xl w-32 -bottom-10 -my-7 bg-tomato py-2 px-4`}
            >
              <ul onMouseLeave={() => setCategoryOpen(!categoryOpen)}>
                <li
                  className="px-1 cursor-pointer hover:text-black hover:bg-beige"
                  onClick={() => selectCategory("")}
                >
                  All
                </li>
                {categories?.length > 0 &&
                  categories.map(category => (
                    <li
                      key={category.id}
                      className="px-1 cursor-pointer hover:text-black hover:bg-beige"
                      onClick={() => selectCategory(category.id)}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
            <li className="w-full pr-5 lg:px-5">
              <div className="lg:w-72 h-10 p-2 rounded-full flex gap-2 items-center border border-beige">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  value={query}
                  onChange={e => dispatch(setQuery(e.target.value))}
                  className="w-full h-full bg-tomato focus:outline-none placeholder:text-beige placeholder:text-sm"
                  placeholder="Find your favorite items here..."
                />
              </div>
            </li>
            <li className="hover:text-white">
              <Link to="/login">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="flex gap-2">
            <li>
              <Link to="/login">
                <button className="border font-medium border-beige py-2 px-4 rounded-lg hover:bg-white hover:text-tomato">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="py-2 px-4 font-medium border border-beige bg-beige text-tomato rounded-lg hover:text-tomato hover:bg-white">
                  Signup
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      {/* smaller device */}
      <div className="lg:hidden h-14 w-full sticky bottom-0 z-99 bg-tomato text-beige shadow-md border-t">
        <ul className="flex justify-between p-2">
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <Link
              to="/public"
              className="flex flex-col items-center justify-center"
            >
              <i className="fa-solid fa-house"></i>
              <p>Home</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <Link
              to="/login"
              className="flex flex-col items-center justify-center"
            >
              <i className="fa-solid fa-heart"></i>
              <p>Whislist</p>
            </Link>
          </li>
          <li className="flex flex-col items-center justify-center hover:text-white cursor-pointer">
            <Link
              to="/signup"
              className="flex flex-col items-center justify-center"
            >
              <i className="fa-solid fa-user"></i>
              <p>Account</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
