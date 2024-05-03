import { settingState } from "@/atoms/settingState";
import { Switch } from "@headlessui/react";
import React from "react";
import { useRecoilState } from "recoil";

const SettingsWidget = () => {
  const [settings, setSettings] = useRecoilState(settingState);

  const handleChangeVariablePrefix = (e) => {
    setSettings((prev) => ({ ...prev, variable_prefix: e.target.value }));
  };

  return (
    <div className="variable-prefix-widget">
      <div className="mb-6">
        <label htmlFor="colorName" className="text-sm font-semibold mb-1 block">
          Variable Prefix
        </label>
        <input
          type="text"
          placeholder="Enter prefix (eg: bs-, abc-, etc.)"
          className="border border-[#dedede] text-[#131313] w-full h-10 px-4 placeholder:text-base placeholder:text-[#cccccc]"
          id="colorName"
          name="colorName"
          onChange={(e) => handleChangeVariablePrefix(e)}
          value={settings?.variable_prefix}
        />
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={settings.dark_theme}
          onChange={() =>
            setSettings((prev) => ({
              ...prev,
              dark_theme: !prev.dark_theme,
            }))
          }
          className={`${settings.dark_theme ? "bg-[#21DF4B]" : "bg-[#6d7c71]"}
            relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-[transparent] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              settings.dark_theme ? "translate-x-[26px]" : "translate-x-0"
            }
              pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white transition duration-200 ease-in-out`}
          />
        </Switch>
        <label htmlFor="colorName" className="text-sm font-semibold mb-1 block">
          Enable Dark Theme?
        </label>
      </div>
    </div>
  );
};

export default SettingsWidget;
