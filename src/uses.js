import * as Aqua from '@ignatiusmb/aqua';

export function aquaInit() {
  Aqua.code.init();
  Aqua.form.init();
  Aqua.modal.init();
  Aqua.code.highlight();
}
