"use client";
import ColorWidget from "@/widgets/ColorWidget";
import VariablePrefixWidget from "@/widgets/VariablePrefixWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <VariablePrefixWidget />
      <ColorWidget />
    </RecoilRoot>
  );
}
