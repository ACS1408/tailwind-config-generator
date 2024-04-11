import { variablePrefixState } from "@/atoms/variablePrefixState";
import Container from "@/components/utils/Container";
import React from "react";
import { useRecoilState } from "recoil";

const VariablePrefixWidget = () => {
  const [variablePrefix, setVariablePrefix] =
    useRecoilState(variablePrefixState);

  const handleChangeVariablePrefix = (e) => {
    setVariablePrefix(e.target.value);
  };

  return (
    <section className="variable-prefix-widget pt-16 pb-8">
      <Container>
        <h2 className="text-3xl font-semibold mb-6">Variable Prefix</h2>
        <input
          type="text"
          placeholder="Enter name"
          className="border border-[#dedede] text-[#131313] h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
          id="colorName"
          name="colorName"
          onChange={(e) => handleChangeVariablePrefix(e)}
          value={variablePrefix}
        />
      </Container>
    </section>
  );
};

export default VariablePrefixWidget;
