import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Table, Button, Image } from "react-bootstrap";
import Header from "../header/header";
import { Web3Storage } from 'web3.storage'
import './uploadPage.css'
import { Web3Button } from "@web3modal/react";
import {useAccount} from 'wagmi'


/**
 *  This code defines a React component called UploadPage that 
 *  allows the user to upload files to IPFS using the Web3.Storage 
 *  API. The component displays a file dropzone, allows the user to 
 *  select files for upload, and displays a table of selected files 
 *  with links to the uploaded files on IPFS. The Web3Storage   
 *  instance is initialized with an access token for authentication. 
 * 
 *  The useState hook is used to manage the state of the component, 
 *  including the selected files, file URLs, and whether an upload 
 *  is urrently in progress. The useMemo hook is used to memoize the
 *  onDrop callback function. The useDropzone hook is used to handle
 *  file drops and updates the selected files state accordingly.
 * 
 */

function UploadPage() {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fileUrls, setFileUrls] = useState([]);
    const [link, setLink] = useState("");
    const {isConnected, address} = useAccount();
    
    // A function to select file
    const onDrop = useMemo(
        () => (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
          setFileUrls([]); // clear old link
          setLink('')
        },
        []
    );
      
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    const handleDelete = (fileToDelete) => {
        setFiles((prevFiles) =>
          prevFiles.filter((file) => {
            if (file === fileToDelete) {
              URL.revokeObjectURL(file.preview);
              return false;
            }
            return true;
          })
        );
    };
      
  
    // A function to upload file to ipfs using web3 storage
   
    const uploadToWeb3Storage = async () => {
        try {
         const web3StorageApi = process.env.REACT_APP_WEB3STORAGE_TOKEN
          const client = new Web3Storage({ token: web3StorageApi });
      
          if (files.length === 0) {
            console.log("No files to upload.");
            return;
          }
          
          if (files.length === 0) {
            console.log("No files to upload.");
            return;
          }

          setUploading(true);
      
          const rootCid = await client.put(files)
      
          const res = await client.get(rootCid)
      
          const Newfiles = await res.files()
          console.log("Files uploaded to Web3.Storage:", Newfiles);
      
          const fileUrls = Newfiles.map(
            (file) => `https://dweb.link/ipfs/${file.cid}`
          );
          console.log("File URLs:", fileUrls);
          setLink(fileUrls[0]);

          setFileUrls(fileUrls); 

          setUploading(false);
          setFiles(Newfiles);
          
          return fileUrls;
        } catch (error) {
          console.error(error);
        //   setFiles([]);
        }finally {
            setUploading(false); // Set uploading back to false after upload is complete
        }
    }

 
      

  return (
    <div>
      {address  && isConnected  ? (
        <div>

          <Header />
          <h1 className="upload">Upload File</h1>
            <div className="upload--Page" {...getRootProps()}>
            <input {...getInputProps()} disabled={uploading} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p className="drop--text">Click here/ Drop some files here to <br/> upload files to IPFS</p>
            )}
            </div>
            {files.length > 0 && (
            <div>
                <h4 className="selected">Selected Files:</h4>
                <Table striped responsive className="file-table">
                <thead>
                    <tr>
                    <th>Preview</th>
                    <th>File Name</th>
                    <th>Link</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                    <tr key={file.name}>
                        <td>
                        {file.type.includes("image") ? (
                            <img
                            src={file.preview}
                            alt={file.name}
                            style={{ maxWidth: 400 }}
                            />
                        ) : (
                            <div>{file.name}</div>
                        )}
                        </td>
                        <td>{file.name}</td>
                        <td>
                        {link && (
                            <a href={link} target="_blank" rel="noreferrer">
                            {link}
                            </a>
                        )}
                        </td>
                        <td>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(file)}
                            disabled={uploading}
                        >
                            Delete
                        </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                <Button
                className="upload--btn"
                variant="primary"
                onClick={uploadToWeb3Storage}
                disabled={uploading || !files.length}
                >
                {uploading ? "Uploading..." : "Upload to IPFS"}
                </Button>
            </div>
            )}
        </div>
      ):(
        <div className="not-connected">
          <Web3Button />
          <p className="hero--sl--text">Connect wallet to view your dashboard</p>
        </div>
      )}

    </div>
  );
}

export default UploadPage;
