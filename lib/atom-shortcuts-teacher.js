'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.onDidDispatch(ev => {
      if ('originalEvent' in ev) {
        if (ev['originalEvent'] instanceof KeyboardEvent) {
          // This is already a keyboard event, never mind
          return;
        }
      }

      const command = ev['type']; // For example: "autoflow:reflow-selection"

      const keybindings = atom.keymaps.findKeyBindings({"command": command});
      if (keybindings.length == 0) {
        // No keybindings available, never mind
        return;
      }

      // FIXME: Bring up a notification box
      console.log("Command: " + command + "  Bindings: " + keybindings);
      console.log(ev);
      console.log(keybindings);
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },
};
