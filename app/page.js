"use client";
import CodeBlock from "@/components/CodeBlock";
import BoxShadowWidget from "@/widgets/BoxShadowWidget";
import ColorWidget from "@/widgets/ColorWidget";
import FontSizeWidget from "@/widgets/FontSizeWidget";
import FontWeightWidget from "@/widgets/FontWeightWidget";
import SpacingWidget from "@/widgets/SpacingWidget";
import VariablePrefixWidget from "@/widgets/VariablePrefixWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <VariablePrefixWidget />
      <ColorWidget />
      <SpacingWidget />
      <FontWeightWidget />
      <FontSizeWidget />
      <BoxShadowWidget />
      <CodeBlock />
    </RecoilRoot>
  );
}
