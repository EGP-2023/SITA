// hooks/useWeb3Auth.ts
import { useCallback } from "react";
import { useRouter } from "next/router";
import useWeb3AuthConnector from "./useWeb3AuthConnector";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { polygonMumbai } from "@wagmi/core/chains";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

const useWeb3Auth = () => {
  //   const { chains } = configureChains([polygonMumbai, polygon], [publicProvider()]);
  //   const { connectAsync } = useConnect({
  //     connector: new Web3AuthConnector({
  //       chains: ["0x1"],
  //       options: {
  //         clientId: "YOUR_CLIENT_ID", // Get your own client id from https://dashboard.web3auth.io
  //       },
  //     }),
  //   });
  //   const { web3 } = useWeb3AuthConnector([polygonMumbai]);

  const { connectAsync } = useConnect({
    connector: new Web3AuthConnector({
      chains: [polygonMumbai],
      options: {
        clientId: "YOUR_CLIENT_ID", // Get your own client id from https://dashboard.web3auth.io
      },
    }),
  });

  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();

  const handleAuth = useCallback(async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account } = await connectAsync();

    const result = await requestChallengeAsync({
      address: account,
      chainId: polygonMumbai.id,
    });

    if (!result) {
      throw new Error("Failed to get challenge message from requestChallengeAsync.");
    }
    const { message } = result;

    const signature = await signMessageAsync({ message });
    const signInResult = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    });

    if (!signInResult?.url) {
      throw new Error("Failed to sign in with moralis-auth.");
    }

    const { url } = signInResult;

    push(url);
  }, [isConnected, connectAsync, disconnectAsync, requestChallengeAsync, signMessageAsync, push]);

  return {
    handleAuth,
  };
};

export default useWeb3Auth;
