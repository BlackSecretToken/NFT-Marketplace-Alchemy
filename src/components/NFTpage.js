import Navbar from "./Navbar";
import axie from "../tile.jpeg";
import { useLocation, useParams} from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

export default function NFTPage (props) {

    const [data, updateData] = useState({});
    const [message, updateMessage] = useState("");
    const [dataFetched, updateFetched] = useState(false);
    const currAddress = useSelector((state) => state.connectWallet.currAddress);
    const tokenId = useParams().tokenId;

    async function getNFTData(tokenId) {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);

        let seller =listedToken.seller;
        let owner = listedToken.owner;

        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: seller.toLowerCase(),
            owner: owner.toLowerCase(),
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateFetched(true);
    }

    async function buyNFT() {
        try {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
            let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether')
            let transaction = await contract.executeSale(tokenId, {value:salePrice});
            await transaction.wait();

            alert('You successfully bought the NFT!');
        }
        catch(e) {
            alert("Upload Error"+e)
        }
    }
    console.log(tokenId);
    if (!dataFetched)
        getNFTData(tokenId);
    return(
        <div>
            <Navbar></Navbar>
            <div style={{"minHeight":"100vh"}}>
                <div className="flex ml-20 mt-20">
                    <img src={data.image} alt="" className="w-2/5" />
                    <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                        <div>
                            Name: {data.name}
                        </div>
                        <div>
                            Description: {data.description}
                        </div>
                        <div>
                            Price: <span className="">{data.price + " ETH"}</span>
                        </div>
                        <div>
                            Owner: <span className="text-sm">{data.owner}</span>
                        </div>
                        <div>
                            Seller: <span className="text-sm">{data.seller}</span>
                        </div>
                        <div>
                        { currAddress == data.owner || currAddress == data.seller ?
                            <div className="text-emerald-700">You are the owner of this NFT</div>
                            : <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick = {buyNFT}>Buy this NFT</button>
                        }
                        
                        <div className="text-green text-center mt-3">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}