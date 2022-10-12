import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]


const App = () => {
  const [walletAddress, setwalletAddress] = useState(null)

  const [inputValue, setInputValue] = useState('')

  const [gifList, setGifList] = useState([])

  const checkIfwalletIsConneted = async () => {
    if (window?.solana?.isPhantom) {
      console.log("Phantom wallet id found");

      const response = await window.solana.connect({ onlyiftrusted: true });
      console.log("Connect with Public Key", response.publicKey.toString());
      setwalletAddress(response.publicKey.toString());
    }


    else {
      console.log("Phantom wallet is not found ! Get a phantom wallet");
    }

  }

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connect with Public Key", response.publicKey.toString());
      setwalletAddress(response.publicKey.toString());
    }
  };

  const sendGif = async () =>{
    if(inputValue.length>0){
      console.log("Gif link ",inputValue);
    }
    else{
      console.log("Empty Input !! try again")
    }
  }

  const onInputChange = (event) =>{
    const {value} = event.target;
    setInputValue(value);
  }
  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}>



        <input
          type="text"
          placeholder="Enter gif link!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>

      </form>
      <div className="gif-grid">
        {gifList.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfwalletIsConneted();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [])

  useEffect(()=>{
    if(walletAddress){
      console.log("Fetching wallet address...");
      setGifList(TEST_GIFS);
    }
  },[walletAddress]);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            {!walletAddress && renderNotConnectedContainer()}
            {/* We just need to add the inverse here! */}
            {walletAddress && renderConnectedContainer()}
          </p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
