import React, { useState } from 'react';
import { ethers } from 'ethers';
import ProductIdentityManagement from './pid.json';
import './App.css'; //  CSS file for styling


const provider = new ethers.providers.JsonRpcProvider('http://192.168.0.184:8545'); // Geth node URL
//const contractAddress = '0xE99d1d5756D9BC5DEA6959372d658AA0Fa59F617'; // deployed contract address , got this after deploying on geth
const contractAddress = '0x214C788Bbe1161956e61B9Db5f5aAcA22096Eb93'; // 2time deployed address
const signer = provider.getSigner();
//console.log(provider.getCode(contractAddress));//tesing
const contract = new ethers.Contract(contractAddress, ProductIdentityManagement.abi, signer);

function App() {
  const [productName, setProductName] = useState('');
  const [manufacturingLocation, setManufacturingLocation] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState('');
  
  // Initialize cpid as a state variable with an initial value of 100
  const [cpid, setCpid] = useState(0);


  async function registerProduct() {
    try {
      const tx = await contract.registerProduct(productName, manufacturingLocation, batchNumber);
      console.log('Transaction Submitted:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction Mined in Block:', receipt.blockNumber); // Log block number
      console.log('Transaction Receipt:', receipt);
      
      // Increment cpid by 1 and store it in newProductId
      const newProductId = cpid + 1;

      alert('Product registered successfully');
      console.log('Product Registered. New Product ID:', newProductId); // Log the new product ID

      // Update product ID after registration
      setProductId(newProductId);

      // Update cpid for the next registration
      setCpid(newProductId);
      }
     catch (error) {
      console.error('Failed to register product:', error);
    }
  }
  
  async function verifyProduct() {
    try {
      const tx = await contract.verifyProduct(productId);
      await tx.wait();
      alert('Product verified successfully');
    } catch (error) {
      console.error('Failed to verify product:', error);
    }
  }

  async function getProduct() {
    try {
      const details = await contract.getProduct(productId);
      setProductDetails(details);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  }

  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
        <h1>Product Identity Management</h1>
        <div className="section">
          <h2>Register a Product</h2>
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="text" placeholder="Manufacturing Location" value={manufacturingLocation} onChange={(e) => setManufacturingLocation(e.target.value)} />
          <input type="text" placeholder="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} />
          <button onClick={registerProduct}>Register Product</button>
        </div>
        <div className="section">
          <h2>Verify a Product</h2>
          <input type="number" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
          <button onClick={verifyProduct}>Verify Product</button>
        </div>
        <div className="section">
          <h2>Get Product Details</h2>
          <input type="number" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
          <button onClick={getProduct}>Get Product Details</button>
          {productDetails && (
            <div>
              <h3>Product Details</h3>
              <p>Product ID: {productDetails[0].toString()}</p>
              <p>Product Name: {productDetails[1]}</p>
              <p>Manufacturer: {productDetails[2]}</p>
              <p>Manufacturing Location: {productDetails[3]}</p>
              <p>Batch Number: {productDetails[4]}</p>
              <p>Is Verified: {productDetails[5].toString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
