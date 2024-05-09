import React, { useEffect, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../../../apiservices/apiService";

interface HeaderData {
  _id: string;
  bannerUrl: string;
  heading: string;
  paragraph: string;
  // Add other properties as needed
}

const Header = () => {
  const [headerData, setHeaderData] = useState<HeaderData[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/header`);
      const data = response.data; // Extract the response data
      setHeaderData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <button onClick={() => getData()}>get data</button>
      {/* {data.length > 0 ? (
                <div>
                    <h1>{data[0]?.bannerUrl}</h1>
                    <h1>{data[2]?.heading}</h1>
                    <h1>{data[3]?.paragraph}</h1> */}
      {/* If data is an array, you can access its properties like data[0]?.heading */}
      {/* </div>
            ) : (
                <p>Loading...</p>
            )} */}
    </>
  );
};

export default Header;
