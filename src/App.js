import React, { useState, useEffect } from "react";

import Todo from "./Todo";
import Web3 from 'web3';

import { contractAddress, ABI } from './config';

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  var [counter, setCounter] = useState();

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchCurrentCount() {
        var web3 = window.web3;
        web3 = new Web3(web3.currentProvider);
        const instance = new web3.eth.Contract(ABI, contractAddress);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        const currentCount = await instance.methods.count().call({ from: account })
        setCounter(currentCount);
    }
    fetchCurrentCount();
  }, []);


  useEffect(() => {
    async function fetchData() {
      if (isConnected) {
        var arr = [];
        var web3 = window.web3;
        web3 = new Web3(web3.currentProvider);
        const instance = new web3.eth.Contract(ABI, contractAddress);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        while (counter >= 0) {
          const data = await instance.methods.tasksMapping(counter).call({ from: account })
          arr.push(data)
          counter--;
        }
        setTodos(arr)
      }
    }

    fetchData();
  }, [isConnected]);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
        }
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);

        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        setAccountAddress(account);
        setIsConnected(true)

        if (userAccount.length === 0) {
          console.log('Please connect to meta mask');
        }
      }
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
      );
    }
  };


  return (
    <div className="app">
      {!isConnected ? (
        <div className='bgImg'>
          <div>
            <button className="button" onClick={onConnect}>
              Connect to MetaMask
            </button>
          </div>
        </div>
      ) : <Todo accountAddress={accountAddress} todos={todos} setTodos={setTodos} />
      }
    </div>
  );
}

export default App;