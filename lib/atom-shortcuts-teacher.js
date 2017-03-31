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

      // FIXME: Bring up a notification box
      const eventType = ev['type']; // For example "autoflow:reflow-selection"
      console.log(ev);
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },
};
