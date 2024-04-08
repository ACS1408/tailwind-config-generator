"use client";
import ColorWidget from "@/widgets/ColorWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <ColorWidget />
    </RecoilRoot>
  );
}
