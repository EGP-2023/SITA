import { ipfsUploadImage, ipfsUploadMetadata } from "~~/utils/ipfsUpload";

export default function IPFSUploader() {
  function handleUploadImage() {
    console.log("handleUploadImage");
    ipfsUploadImage();
  }

  async function handleUploadMetadata() {
    console.log("handleUploadMetadata");

    const metaData = {
      name: "test",
      description: "test",
    };
    const tokenURI = await ipfsUploadMetadata(metaData);

    const tokenURL = `https://${tokenURI}.ipfs.nftstorage.link`;

    console.log("NFT IPFS upload is completed, NFT is stored at : ", tokenURL);
  }

  return (
    <div>
      <h1>IPFS Uploader</h1>
      <div>
        <button onClick={handleUploadImage}>Upload Image</button>
      </div>

      <div>
        <button onClick={handleUploadMetadata}>Upload Metadata</button>
      </div>
    </div>
  );
}
