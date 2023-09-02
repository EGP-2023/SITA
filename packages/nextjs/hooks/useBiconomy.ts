import { useCallback, useEffect, useRef, useState } from "react";
import { BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { Bundler } from "@biconomy/bundler";
import { ChainId } from "@biconomy/core-types";
import { BiconomyPaymaster } from "@biconomy/paymaster";
import SocialLogin from "@biconomy/web3-auth";
import { ethers } from "ethers";
// import "@Biconomy/web3-auth/dist/src/style.css";
import { SitaStore, useSitaStore } from "~~/utils/sitaStore";

const bundler = new Bundler({
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/abc",
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster = new BiconomyPaymaster({
  paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL || "",
});

const useBiconomy = () => {
  const [smartAccount, setSmartAccount] = useState<any>(null);
  const [interval, enableInterval] = useState(false);
  const sdkRef = useRef<SocialLogin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  const setBiconomySmartAccount = useSitaStore((state: SitaStore) => state.setBiconomySmartAccount);

  const setupSmartAccount = useCallback(async () => {
    if (!sdkRef?.current?.provider) return;
    sdkRef.current.hideWallet();
    setLoading(true);
    console.log(`setting up smart account... Loading: ${loading}`);
    const web3Provider = new ethers.providers.Web3Provider(sdkRef.current.provider);
    setProvider(web3Provider);

    try {
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
      console.log("error setting up smart account... ", err);
    }
  }, [loading, setBiconomySmartAccount]);

  useEffect(() => {
    let configureLogin: any;
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount();
          clearInterval(configureLogin);
        }
      }, 1000);
    }
  }, [interval, setupSmartAccount]);

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      //TODO: also add the deployment url to the whitelist
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
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    setAddress("");
    enableInterval(false);
  };

  useEffect(() => {
    if (address && provider) {
    }
  }, [address, provider]);

  return {
    smartAccount,
    login,
    logout,
    loading,
  };
};

export default useBiconomy;
