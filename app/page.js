"use client";
import FloatingMenuBar from "@/components/FloatingMenuBar";
import MainHeader from "@/components/MainHeader";
import Container from "@/components/utils/Container";
import BoxShadowWidget from "@/widgets/BoxShadowWidget";
import ButtonsWidget from "@/widgets/ButtonsWidget";
import ColorWidget from "@/widgets/ColorWidget";
import FontSizeWidget from "@/widgets/FontSizeWidget";
import FontWeightWidget from "@/widgets/FontWeightWidget";
import SpacingWidget from "@/widgets/SpacingWidget";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <>
      <RecoilRoot>
        <MainHeader />
        <div className="pt-20 pb-24">
          <ColorWidget />
          <Container>
            <div className="grid xxl:grid-cols-2 grid-cols-1 xxl:gap-12">
              <SpacingWidget />
              <FontWeightWidget />
            </div>
          </Container>
          <Container>
            <div className="grid xxl:grid-cols-2 grid-cols-1 xxl:gap-12">
              <FontSizeWidget />
              <BoxShadowWidget />
            </div>
          </Container>
          <ButtonsWidget />
        </div>
        <FloatingMenuBar />
      </RecoilRoot>
    </>
  );
}
