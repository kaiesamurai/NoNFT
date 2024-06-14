import { atom } from "jotai";
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721;

export const globalStateAtom = atom({
  cw721: PUBLIC_CW721_CONTRACT,
  collectionName: "Community",
  trigger: 0,
} as { cw721: string; collectionName: string; trigger: number });
