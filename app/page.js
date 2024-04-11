"use client";
import CodeBlock from "@/components/CodeBlock";
import ColorWidget from "@/widgets/ColorWidget";
import SpacingWidget from "@/widgets/SpacingWidget";
import VariablePrefixWidget from "@/widgets/VariablePrefixWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <VariablePrefixWidget />
      <ColorWidget />
      <SpacingWidget />
      <CodeBlock />
    </RecoilRoot>
  );
}
