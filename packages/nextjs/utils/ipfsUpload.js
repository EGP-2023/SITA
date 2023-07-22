import { NFTStorage, Blob } from "nft.storage";


const API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY });

export async function ipfsUploadImage(files) {

  const blob = new Blob([files[0]]);

  const cid = await client.storeBlob(blob)
  console.log(cid)

  const status = await client.status(cid)
  console.log(status)
  return status.cid;
}


export async function ipfsUploadMetadata(metadata) {

  console.log(metadata);


  const blob = new Blob([JSON.stringify(metadata)], { type: 'text/json' });
  const cid = await client.storeBlob(blob);
  console.log(cid);


  const status = await client.status(cid)
  console.log(status)
  return status.cid;
}