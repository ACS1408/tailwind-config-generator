"use client";
import CodeBlock from "@/components/CodeBlock";
import BoxShadowWidget from "@/widgets/BoxShadowWidget";
import ButtonsWidget from "@/widgets/ButtonsWidget";
import ColorWidget from "@/widgets/ColorWidget";
import FontSizeWidget from "@/widgets/FontSizeWidget";
import FontWeightWidget from "@/widgets/FontWeightWidget";
import SettingsWidget from "@/widgets/SettingsWidget";
import SpacingWidget from "@/widgets/SpacingWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <SettingsWidget />
      <ColorWidget />
      <SpacingWidget />
      <FontWeightWidget />
      <FontSizeWidget />
      <BoxShadowWidget />
      <ButtonsWidget />
      <CodeBlock />
    </RecoilRoot>
  );
}
