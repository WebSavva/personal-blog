import { NextConfig } from "next";
import getConfig from "next/config";

const ROOT_DIR = (getConfig() as NextConfig).serverRuntimeConfig!.rootDir as string;

export default ROOT_DIR;