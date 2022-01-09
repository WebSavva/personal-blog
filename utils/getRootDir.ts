import { NextConfig } from "next";
import getConfig from "next/config";

const getRootDir = () => (getConfig() as NextConfig).serverRuntimeConfig!.rootDir as string;

export default getRootDir;