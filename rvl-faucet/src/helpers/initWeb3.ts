import { ethers } from 'ethers';
import { ExternalProvider } from "@ethersproject/providers";
import {rvlFaucetABI, rvlFaucetAddress} from '../contracts/rvlFaucet';

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;
export const signer = provider? provider.getSigner(): undefined;
// @ts-ignore
export const RVLFaucet = new ethers.Contract(rvlFaucetAddress, rvlFaucetABI, signer);
