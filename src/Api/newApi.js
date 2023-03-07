import React, { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";


/**
 *    This is a React component named Api that fetches and displays NFTs owned by the 
 *    current user using the Moralis API. The component uses the useAccount and 
 *    useNetwork hooks from the wagmi library to get the user's address and network 
 *    information. It also uses the useState hook to manage the state of the fetched 
 *    NFTs, the current page number, and the total number of pages. The component 
 *    fetches the NFTs using the fetchNfts function and updates the state accordingly. 
 * 
 *    The component also displays the fetched NFTs in a table and provides pagination 
 *    functionality using the Pagination component from the react-bootstrap library.
*/

const Api = () => {
  const [nfts, setNfts] = useState([]);
  const { address } = useAccount();
  const { chain} = useNetwork();
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);;
  const [totalPages, setTotalPages] = useState(1);

  const fetchNfts = async (page) => {
    const offset = (page - 1) * limit;
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft?${chain.id}format=decimal&limit=10&offset=${offset}`;

    const moralisApiKey =  process.env.REACT_APP_MORALIS_APPLICATION_ID
    const options = {
      headers: {
        accept: "application/json",
        "X-API-Key": moralisApiKey, // replace with your Moralis app ID
      },
    };

    // Return Nfts from a wallet
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setNfts(data.result);
      let total;
      if(data.total === null){
        total = 1
      }else{
        total = data.total/limit
      }
      setTotalPages(Math.ceil(total));
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNfts(1);
  }, [address, chain, currentPage]);

  console.log('resultNew:',nfts)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
    fetchNfts(pageNumber);
  };
  
  // Render items in the pagination
  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };


  return (
    <div>
      <Table responsive striped bordered hover variant="dark" className="table">
        <thead>
          <tr>
            <th>Token ID</th>
            <th>Name</th>
            <th>Contract Address</th>
          </tr>
        </thead>
        <tbody>
          {nfts?.map((nft) => (
            <tr key={nft.block_number}>
              <td>{nft.token_id}</td>
              <td>{nft.name ? nft.name : "No name"}</td>
              <td>{nft.token_address}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* conditionally render the Pagination component */}
      {totalPages && totalPages > 1 && (
        <div className="pagination">
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      )}
      <p>Note: pagination won't work if you don't have more than 10 Nfts in this Network</p>
    </div>
  );

};

export default Api;