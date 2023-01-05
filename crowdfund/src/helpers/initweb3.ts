import { ethers } from 'ethers';
import { ExternalProvider } from "@ethersproject/providers";
import {projectsFactoryABI, projectsFactoryAddress} from '../contracts/projectsFactory';
import {rvlTokenABI, rvlTokenAddress} from '../contracts/rvlToken';

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;
export const signer = provider? provider.getSigner(): undefined;
// @ts-ignore
export const projectsFactory = new ethers.Contract(projectsFactoryAddress, projectsFactoryABI, signer);
// @ts-ignore
export const RVLToken = new ethers.Contract(rvlTokenAddress, rvlTokenABI, signer);