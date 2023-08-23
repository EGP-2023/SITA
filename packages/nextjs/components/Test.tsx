import BiconomyButton from "./BiconomyButton";
import FarmerCard from "./FarmerCard";
import IPFSUploader from "./IPFSUploader";
import Map from "./Map";
import WorldButton from "./WorldButton";

export default function Test() {
  const setArea = (area: number) => {};

  return (
    <>
      <h1>Test</h1>
      <WorldButton />
      <BiconomyButton />
      <IPFSUploader />
      <Map setArea={setArea} />

      <FarmerCard />
    </>
  );
}
