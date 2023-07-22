import BiconomyButton from "./BiconomyButton";
import FarmerCard from "./FarmerCard";
import IPFSUploader from "./IPFSUploader";
import Map from "./Map";
import WalletConnectButton from "./WalletConnectButton";
import WorldButton from "./WorldButton";

export default function Main() {
  return (
    <>
      <h1>Main</h1>
      <WorldButton />
      <BiconomyButton />
      <WalletConnectButton/>
      <IPFSUploader />
      <Map />

      <FarmerCard />
    </>
  );
}
