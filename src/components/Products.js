import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "./Search";
import ProdcutsTable from "./ProdcutsTable";
import "../stylesheets/Products.css";
import ProductsForm from "./ProductsForm";
import { useHistory, useParams } from "react-router";
import SweetAlert2 from "react-sweetalert2";

function Products(props) {
  const { id } = useParams();
  let history = useHistory();
  const products = useSelector((state) => state.BusinessData.products);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("pos_token")) {
      history.push("/login");
      SweetAlert2({
        text: "Please Log-in first.",
        icon: "error",
        timer: 1500,
        button: false,
      });
    }
  }, [history]);

  const getSearch = (data) => {
    setSearch(data);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Search
        data={products}
        getSearch={getSearch}
        placeHolder="Search product by name..."
      />
      {id ? <ProductsForm id={id} /> : <ProductsForm />}
      {search.length ? (
        search === "empty" ? (
          <ProdcutsTable data={[]} />
        ) : (
          <ProdcutsTable data={search} />
        )
      ) : (
        <ProdcutsTable data={products} />
      )}
    </div>
  );
}

export default Products;
