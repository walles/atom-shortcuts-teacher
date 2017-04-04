'use babel';

import ShortcutsTeacher from '../lib/shortcuts-teacher';

describe('Shortcuts Teacher', () => {
  it('should describe a keystrokes array as Markdown', () => {
    const d = ShortcutsTeacher.describeKeystrokeArray;
    expect(d(['ctrl-k'])).toEqual("`ctrl-k`");
    expect(d(['ctrl-x', 'ctrl-s'])).toEqual("`ctrl-x ctrl-s`");
  });

  it('should escape backticks in keystrokes descriptions', () => {
    const d = ShortcutsTeacher.describeKeystrokeArray;
    expect(d(['ctrl-`'])).toEqual("`ctrl-\\``");
    expect(d(['ctrl-`', 'ctrl-s'])).toEqual("`ctrl-\\` ctrl-s`");
  });
});
