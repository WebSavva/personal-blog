import { FC, PropsWithChildren } from "react";

export type GenericProps = PropsWithChildren<Record<string, any>>;
export type ExtendedComponent = FC<GenericProps>;