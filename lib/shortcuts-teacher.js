'use babel';

import { CompositeDisposable } from 'atom';

// FIXME: We're getting warnings in the console indicating that maybe we should
// mark our event handler as "passive". Not sure if this is even because of us,
// or how to do this really, some docs here:
// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#solution-the-passive-option

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.onDidDispatch((event) => this.handleCommand(event)));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  handleCommand(event) {
    if ('originalEvent' in event) {
      if (event['originalEvent'] instanceof KeyboardEvent) {
        // This is already a keyboard event, never mind
        return;
      }
    }

    const command = event['type']; // For example: "autoflow:reflow-selection"

    const keybindings = atom.keymaps.findKeyBindings({"command": command});
    if (keybindings.length == 0) {
      // No keybindings available, never mind
      return;
    }

    // Bring up a notification box
    const description = `You can run ${command} using ${this.describeBindings(keybindings)}`;
    atom.notifications.addInfo("Shortcuts Teacher", { dismissable: false, description: description });
  },

  /**
   * Takes an array of KeyBinding objects and returns a Markdown string describing
   * these.
   *
   * @param {KeyBinding[]} bindingsArray the keybindings to list
   *
   * @return {string} A description like "cmd-Q or ctrl-shift-Q"
   */
  describeBindings(bindingsArray) {
    var descriptionsArray = [];
    for (let binding of bindingsArray) {
      descriptionsArray.push(this.describeKeystrokeArray(binding.keystrokeArray));
    }

    var description = '';
    if (descriptionsArray.length > 1) {
      description += descriptionsArray.slice(0, -1).join(', ');
      description += ' or ';
    }
    description += descriptionsArray.slice(-1)[0];

    return description;
  },

  /**
   * @param {string[]} keystrokeArray Sequence of keystrokes
   * @return {string} A Markdown description of the keystroke sequence
   */
  describeKeystrokeArray(keystrokeArray) {
    var markdownKeystrokes = [];
    for (let keystroke of keystrokeArray) {
      // FIXME: If the keystroke contains a backtick (`), what do we do?
      markdownKeystrokes.push('`' + keystroke + '`');
    }
    return markdownKeystrokes.join(' ');
  },
};
