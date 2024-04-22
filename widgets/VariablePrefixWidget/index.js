import { settingState } from "@/atoms/settingState";
import Container from "@/components/utils/Container";
import React from "react";
import { useRecoilState } from "recoil";

const VariablePrefixWidget = () => {
  const [settings, setSettings] = useRecoilState(settingState);

  const handleChangeVariablePrefix = (e) => {
    setSettings((prev) => ({ ...prev, variable_prefix: e.target.value }));
  };

  return (
    <section className="variable-prefix-widget pt-16 pb-8">
      <Container>
        <h2 className="ttl text-3xl font-semibold mb-6">Variable Prefix</h2>
        <input
          type="text"
          placeholder="Enter name"
          className="border border-[#dedede] text-[#131313] h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
          id="colorName"
          name="colorName"
          onChange={(e) => handleChangeVariablePrefix(e)}
          value={settings?.variable_prefix}
        />
      </Container>
    </section>
  );
};

export default VariablePrefixWidget;
