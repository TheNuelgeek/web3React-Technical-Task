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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNfts = async (page) => {
    const offset = (page - 1) * limit;
    const url = `https://deep-index.moralis.io/api/v2/${address}/nft?${chain.id}format=decimal&limit=10&offset=${offset}`;

    console.log('offset:', offset)

    const moralisApiKey =  process.env.REACT_APP_MORALIS_APPLICATION_ID
    const options = {
      headers: {
        accept: "application/json",
        "X-API-Key": moralisApiKey, // replace with your Moralis app ID
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setNfts(data.result);
      setTotalPages(Math.ceil(data.total / limit));
      console.log('totalP:', totalPages)
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNfts(1);
  }, [address, chain]);

  console.log('resultNew:',nfts)
  const handlePageChange = (pageNumber) => {
    fetchNfts(pageNumber);
  };



    let active = currentPage;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

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


      <div className="pagination">
        {/* <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
            >
                {index + 1}
            </Pagination.Item>
            ))}
        </Pagination> */}
       <Pagination>{items}</Pagination>
      </div>

    </div>
  );
};

export default Api;