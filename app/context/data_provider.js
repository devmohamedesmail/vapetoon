import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { api_config } from "../config/api_config";

export const DataContext = createContext();

export default function data_provider({ children }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Settings object with app configuration
  const settings = {
    appurl: process.env.EXPO_PUBLIC_APP_URL || api_config.url,
    currency_ar: api_config.currency_ar,
    currency_en: api_config.currency_en,
  };



  // ----------------------  fetch categories ----------------------------------
  const fetch_categories_data = async () => {
    try {
      const response = await axios.get(
        `${api_config.url}/categories?populate=image`,
        {
          headers: {
            Authorization: `Bearer ${api_config.token}`,

          }
        }
      );
      setCategories(response.data.data);

    } catch (error) {
      console.log("error fetching categories data", error);
    }
  };

  // ----------------------  fetch products ----------------------------------
  const fetch_products_data = async () => {
    try {
      const response = await axios.get(
        `${api_config.url}/products?populate=*`, {
        headers: {
          Authorization: `Bearer ${api_config.token}`,

        }
      }
      );
      setProducts(response.data.data);
    
    } catch (error) {
      console.log("error fetching categories data", error);
    }
  };


  

  useEffect(() => {
    fetch_categories_data();
    fetch_products_data();


  }, []);

  return (
    <DataContext.Provider value={{ categories, products, settings }}>
      {children}
    </DataContext.Provider>
  );
}
