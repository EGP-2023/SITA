import fs from 'fs';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import abi from './FunctionsConsumer.js';

const main = async () => {
    dotenv.config();
    const source = fs.readFileSync("./credit.js", "utf8").toString()
    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const consumer = new ethers.Contract("0x45De681cdacbC9838656613Ba3c549273b354ac0", abi, signer)
    const tx = await consumer.executeRequest(
        source,
        "0x",
        [country, area],
        1971,
        300000
    )
    const txReponse = await tx.wait(3)
    console.log(txReponse)
}