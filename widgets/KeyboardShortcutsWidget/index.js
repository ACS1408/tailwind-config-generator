import React from "react";

const KeyboardShortcutsWidget = () => {
  return (
    <div className="keyboard-shortcuts-widget">
      <div>
        <b>CTRL + S:</b> Save to local
      </div>
      <div>
        <b>CTRL + R:</b> Reset local
      </div>
      <div>
        <b>CTRL + P:</b> Open settings
      </div>
      <div>
        <b>CTRL + K:</b> Open keyboard shortcuts
      </div>
      <div>
        <b>CTRL + I:</b> Import selection
      </div>
      <div>
        <b>CTRL + E:</b> Export selection
      </div>
      <div>
        <b>CTRL + ENTER:</b> Generate code
      </div>
      <div>
        <b>ESC:</b> Close popups
      </div>
    </div>
  );
};

export default KeyboardShortcutsWidget;
