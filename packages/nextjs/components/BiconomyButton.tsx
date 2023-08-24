import { useEffect, useRef, useState } from "react";
// import "@Biconomy/web3-auth/dist/src/style.css";
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler, IBundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { BiconomyPaymaster, IPaymaster } from "@biconomy/paymaster";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useSitaStore } from "~~/utils/sitaStore";

const bundler: IBundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc", // you can get this value from biconomy dashboard.
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
  paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || "",
});

const Test: NextPage = () => {
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [interval, enableInterval] = useState(false);
  const sdkRef = useRef<SocialLogin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const setBiconomySmartAccount = useSitaStore(state => state.setBiconomySmartAccount);

  useEffect(() => {
    // This code runs only in the browser (client-side) after the component has mounted
    async function instantiateSocialLogin() {
      const { default: SocialLogin } = await import('@biconomy/web3-auth');  // Dynamically import SocialLogin
      sdkRef.current = new SocialLogin();
    }

    instantiateSocialLogin();
  }, []);


  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const init = async () => {
        const { default: SocialLogin } = await import('@biconomy/web3-auth');  // Dynamically import SocialLogin
        sdkRef.current = new SocialLogin();
      };
      init();
    }
  }, []); 
  
  useEffect(() => {
    let configureLogin: any;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);

      return () => {
        clearInterval(configureLogin);
      }
    }
  }, [interval]);

  async function login() {
    try {
      if (!sdkRef.current) {
        const socialLoginSDK = new SocialLogin();
        const signature1 = await socialLoginSDK.whitelistUrl("http://localhost:3000/");
        await socialLoginSDK.init({
          chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
          network: "testnet",
          whitelistUrls: {
            "http://localhost:3000/": signature1,
          },
        });
        sdkRef.current = socialLoginSDK;
      }
      if (!sdkRef.current.provider) {
        sdkRef.current.showWallet();
        enableInterval(true);
      } else {
        setupSmartAccount();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function setupSmartAccount() {
    try {
      if (!sdkRef?.current?.provider) return;
      sdkRef.current.hideWallet();
      setLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(sdkRef.current.provider);
      setProvider(web3Provider);
      const biconomySmartAccountConfig: BiconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster,
      };
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig);
      biconomySmartAccount = await biconomySmartAccount.init();
      setAddress(await biconomySmartAccount.getSmartAccountAddress());
      setSmartAccount(biconomySmartAccount);
      setBiconomySmartAccount(biconomySmartAccount);
      console.log(biconomySmartAccount);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  const logout = async () => {
    try {
      if (!sdkRef.current) {
        throw new Error("Web3Modal not initialized.");
      }
      await sdkRef.current.logout();
      sdkRef.current.hideWallet();
      setSmartAccount(null);
      setAddress("");
      enableInterval(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <MetaHeader
        title="Debug Contracts | Scaffold-ETH 2"
        description="Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way"
      />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        <h1>Test</h1>

        {error && <p>Error: {error}</p>}

        {!smartAccount && <button onClick={login}>Connect to Web3</button>}
        {smartAccount && <button onClick={logout}>Logout</button>}
      </div>
    </>
  );
};

export default Test;
