'use babel';

import AtomShortcutsTeacherView from './atom-shortcuts-teacher-view';
import { CompositeDisposable } from 'atom';

export default {

  atomShortcutsTeacherView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomShortcutsTeacherView = new AtomShortcutsTeacherView(state.atomShortcutsTeacherViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomShortcutsTeacherView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-shortcuts-teacher:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomShortcutsTeacherView.destroy();
  },

  serialize() {
    return {
      atomShortcutsTeacherViewState: this.atomShortcutsTeacherView.serialize()
    };
  },

  toggle() {
    console.log('AtomShortcutsTeacher was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
