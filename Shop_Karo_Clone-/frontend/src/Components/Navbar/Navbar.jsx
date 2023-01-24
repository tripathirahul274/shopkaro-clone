import { useState, useEffect } from "react";
import { Nav, Aside } from "./Styled-Navbar";
import { listItems, data } from "./data";
import { allProducts } from "../../AllProducts";


  import mall_logo from "./mall_logo.png";



import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  let count = 100;
  let name = "Rahul";
  let [index, setIndex] = useState(8);
  let [result, setResult] = useState([]);
  const mouseOver = (e) => {
    e.currentTarget.classList.add("height");
  };
  // console.log(name);

  const mouseOut = (e) => {
    e.currentTarget.classList.remove("height");
  };

  document.body.addEventListener("click", function (e) {
    let article = document.querySelector("#search-results");
    if (e.target.parentElement.id === "search-results") {
      article.style.visibility = "visible";
    } else {
      article.style.visibility = "hidden";
    }
    // console.log(e.target.parentElement);
  });

  useEffect(() => {
    document.querySelectorAll("li")[index].classList.add("li");
    return () => {
      document.querySelectorAll("li")[index].classList.remove("li");
    };
  });

  const inpHandler = (e) => {
    let article = document.querySelector("#search-results");
    let newArr = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name.toLowerCase().includes(e.target.value)) {
        newArr.push(allProducts[i]);
      }
    }
    if (newArr.length && e.target.value) {
      setResult(newArr);
      article.style.visibility = "visible";
    } else {
      article.style.visibility = "hidden";
    }
  };
  const modalClose = (e) => {
    e.target.parentElement.style.transform = "translateX(-100%)";
  };
  const modalOpen = () => {
    let ele = document.querySelector("#hidden-menu");
    ele.style.transform = "translateX(0)";
  };

  const submenuHandler = (e) => {
    if (e.target.classList.contains("main-para")) {
    }
    if (e.target.classList.contains("sub-para")) {
    }
  };
  return (
    <>
      {/* <FaAlignJustify id="hidden-menu-open" onClick={modalOpen} /> */}
      <Aside id="hidden-menu">
        <button onClick={modalClose}>X</button>
        <article>

          <Link to="/profile">
            <p id="">

              <h2>Hello User</h2>
            </p>
          </Link>
          <h3>Categories</h3>
          {listItems.map((i, index) => (
            <p className="main-para" onClick={submenuHandler} key={index}>
              {i}
              <img
                src="https://www.svgrepo.com/show/60060/down-arrow.svg"
                alt=""
              />
              {data[index].map((items, inde) => (
                <p className="sub-para" onClick={submenuHandler} key={inde}>
                  {items[0]}
                  <img
                    src="https://www.svgrepo.com/show/60060/down-arrow.svg"
                    alt=""
                  />
                  {items.map((item, ind) => (

                      <p className="sub-sub-para" key={ind}>
                        {ind !== 0 && item}
                      </p>

                  ))}
                </p>
              ))}
            </p>
          ))}
        </article>
      </Aside>
      <Nav>
        <section id="top">
          <Link to="/">
                    <img src={mall_logo} width="100px"/>
          </Link>
          <div>
            <svg
              width="20"
              height="20"
              className="DFW_E nT46U VETef"
              viewBox="0 0 32 32"
              version="1.1"
              aria-hidden="false"
            >
              <path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path>
            </svg>
            <form action="">
              <input
                type="text"
                onChange={inpHandler}
                placeholder="Search for a Product, Brand or Category"
              />
            </form>
            <svg
              width="20"
              height="20"
              className="VdNCI nT46U VETef"
              viewBox="0 0 32 32"
              version="1.1"
              aria-hidden="false"
            >
              <path d="M6.7 25.3H12V28H6.7C5.2 28 4 26.8 4 25.3V20h2.7v5.3zm0-18.6H12V4H6.7C5.2 4 4 5.2 4 6.7V12h2.7V6.7zM25.3 4H20v2.7h5.3V12H28V6.7C28 5.2 26.8 4 25.3 4zm0 21.3H20V28h5.3c1.5 0 2.7-1.2 2.7-2.7V20h-2.7v5.3zm-4-9.3c0 2.9-2.4 5.3-5.3 5.3s-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3zm-2.6 0c0-1.5-1.2-2.7-2.7-2.7s-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7z"></path>
            </svg>
            <article id="search-results">
              {result.map((i, index) => (
                <Link to={`/product/${i.id}`}>
                  <p id={index} key={index}>
                    <svg
                      width="18"
                      height="18"
                      className="DFW_E nT46U VETef"
                      viewBox="0 0 32 32"
                      version="1.1"
                      aria-hidden="false"
                    >
                      <path d="M22 20c1.2-1.6 2-3.7 2-6 0-5.5-4.5-10-10-10S4 8.5 4 14s4.5 10 10 10c2.3 0 4.3-.7 6-2l6.1 6 1.9-2-6-6zm-8 1.3c-4 0-7.3-3.3-7.3-7.3S10 6.7 14 6.7s7.3 3.3 7.3 7.3-3.3 7.3-7.3 7.3z"></path>
                    </svg>
                    <span>{i.name}</span>
                  </p>
                </Link>
              ))}
            </article>
          </div>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.paytmmall&hl=en_IN&gl=US"
            rel="noreferrer"
          >
            <p id="mobile">
              <img
                src="https://www.svgrepo.com/show/371405/mobile.svg"
                alt=""
              />
              Download App

            </p>
          </a>
          <p className="line">|</p>
          <a
            href="#"

            rel="noreferrer"
          >
            <p>Become a Supplier</p>
          </a>
          <p className="line">|</p>

            <p id="profile">
              <img
                src="https://www.svgrepo.com/show/284856/profile-user.svg"
                alt=""
              />
              Login/Sign Up


            </p>


            <p id="cart">
              <span></span>
              <svg
                id="cart"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-cart-check"
                viewBox="0 0 16 16"
              >
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />{" "}
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />{" "}
              </svg>
              Cart
            </p>

        </section>
        <section id="bottom" onMouseOver={mouseOver} onMouseOut={mouseOut}>
          <ul>
            {listItems.map((i, index) => (

                <li key={index} id={index} onMouseOver={() => setIndex(index)}>
                  {i}
                </li>

            ))}
          </ul>
          <article onMouseOut={mouseOut}>
            {data[index].map((items, i) => (
              <div key={i}>
                {items.map((item, ind) => (

                    <p key={ind} className={ind === 0 ? "pink-para" : ""}>

                        {item}

                    </p>

                ))}
              </div>
            ))}
          </article>
        </section>
      </Nav>
    </>
  );
}
