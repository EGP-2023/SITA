import { useEffect, useState } from "react";
import useWeb3Modal from "../hooks/scaffold-eth/useWeb3Modal";

// const providerOptions = {
//   walletlink: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: "RektGuy",
//       infuraId: process.env.WEB3_INFURA_PROJECT_ID,
//     },
//   },
//   walletconnect: {
//     package: WalletConnect,
//     options: {
//       infuraId: process.env.WEB3_INFURA_PROJECT_ID,
//     },
//   },
// };

function WalletConnectButton(props) {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [rendered, setRendered] = useState("");

  const setAccount = props.setAccount;

  const account = props.account;
  const contract = props.contract;

  const fetchContractDetails = async () => {
    if (contract != null && account != "") {
      console.log("Fetching contract details....");
    }
  };

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }
        // console.log(provider);

        // Load the user's accounts.
        const accounts = await provider.listAccounts();

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);
        // const signer = await provider.getSigner();
        // Render either the ENS name or the shortened account address.

        const contractWithWalletConnection = await createContractWithSignerRektguy(provider);

        setContract(contractWithWalletConnection);
        fetchContractDetails();

        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }

        setAccount(accounts[0]);
        // const _balance = await getBalanceOf(contract, account);

        // setBalance();
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, fetchContractDetails, provider, setAccount, setRendered]);

  return (
    <button
      id="ConnectWallet"
      className="toxic-2 w-button"
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "connect wallet"}
      {rendered !== "" && rendered}
    </button>
  );
}

export default WalletConnectButton;
