"use client";
import FloatingMenuBar from "@/components/FloatingMenuBar";
import MainHeader from "@/components/MainHeader";
import BoxShadowWidget from "@/widgets/BoxShadowWidget";
import ButtonsWidget from "@/widgets/ButtonsWidget";
import ColorWidget from "@/widgets/ColorWidget";
import FontSizeWidget from "@/widgets/FontSizeWidget";
import FontWeightWidget from "@/widgets/FontWeightWidget";
import SpacingWidget from "@/widgets/SpacingWidget";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function Home() {
  const [saveProgress, setSaveProgress] = useState();
  return (
    <>
      <RecoilRoot>
        <MainHeader
          saveProgress={saveProgress}
          setSaveProgress={setSaveProgress}
        />
        <div className="pt-20 pb-24">
          <ColorWidget />
          <SpacingWidget />
          <FontWeightWidget />
          <FontSizeWidget />
          <BoxShadowWidget />
          <ButtonsWidget />
        </div>
        <FloatingMenuBar
          saveProgress={saveProgress}
          setSaveProgress={setSaveProgress}
        />
      </RecoilRoot>
    </>
  );
}
