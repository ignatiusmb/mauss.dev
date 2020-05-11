/*! Aqua v20.0.0 by @ignatiusmb - imbagus.com
 *  Copyright (c) 2020 Ignatius Bagus
 *  MIT Licensed -> github.com/ignatiusmb/aqua
 *  https://aqua.imbagus.com
 */

const Aqua = (function () {
  const cache = { toolbar: { add: null, remove: null } };
  const util = {
    checkTimeout: 240,
    create: {
      snackbar: (type) => {
        let barContainer = document.querySelector('.aqua-bars');
        if (!barContainer) {
          const container = document.createElement('div');
          container.className = 'aqua-bars';
          barContainer = document.body.appendChild(container);
        }
        const snackbar = document.createElement('div');
        const main = document.createElement('main');
        const icon = document.createElement('i');
        snackbar.className = `aqua-snackbar ${type}`;
        icon.className = 'fas fa-times';
        icon.addEventListener('click', () => snackbar.classList.remove('show'));
        snackbar.appendChild(main);
        snackbar.appendChild(icon);
        return barContainer.appendChild(snackbar);
      },

      toolbar: (pre, snackbar) => {
        const toolbar = document.createElement('div');
        toolbar.className = 'aqua-code-toolbar';
        const createTool = (iconClass, description, clickCallback) => {
          const tool = document.createElement('a');
          const icon = document.createElement('i');
          const tooltip = document.createElement('span');
          tool.className = `aqua-ctb-item`;
          icon.className = iconClass;
          tooltip.className = 'aqua-ctb-tooltip';
          tooltip.innerText = description;
          tool.appendChild(icon);
          tool.appendChild(tooltip);
          tool.addEventListener('click', clickCallback);
          return tool;
        };

        // Toggle Numbering Button
        toolbar.appendChild(
          createTool('fas fa-list-ol', 'Toggle Numbering', () => {
            pre.classList.toggle('numbered');
          })
        );

        // Copy Code Button
        toolbar.appendChild(
          createTool('far fa-copy', 'Copy', () => {
            const codeLines = pre.querySelectorAll('code');
            const copyArea = document.createElement('textarea');
            const description = snackbar.querySelector('main');
            copyArea.className = 'ghost-area';

            for (const code of codeLines) copyArea.value += code.innerText;
            document.body.appendChild(copyArea);
            copyArea.focus();
            copyArea.select();
            try {
              if (document.execCommand('copy')) description.textContent = 'Copied to clipboard!';
              else description.textContent = 'Copy failed';
            } catch (err) {
              description.textContent = `An error occurred --> ${err}`;
            }

            clearTimeout(cache.toolbar.add);
            clearTimeout(cache.toolbar.remove);
            if (snackbar.classList.contains('show')) {
              snackbar.classList.remove('show');
              cache.toolbar.add = setTimeout(() => snackbar.classList.add('show'), 600);
            } else cache.toolbar.add = setTimeout(() => snackbar.classList.add('show'), 200);
            cache.toolbar.remove = setTimeout(() => snackbar.classList.remove('show'), 5000);
            document.body.removeChild(copyArea);
          })
        );

        return toolbar;
      },
    },
  };

  return {
    code: {
      highlight: () => {
        if (Prism) Prism.highlightAll();
      },
      createToolbar: (pre, snackbar) => util.create.toolbar(pre, snackbar),
      wrapCodes: (code, dataset) => {
        const { language, lineStart } = dataset;
        const pre = document.createElement('pre');
        if (language !== 'svelte') {
          let lineNumber = !lineStart ? 1 : parseInt(lineStart);
          for (const line of code.textContent.split('\n')) {
            const code = document.createElement('code');
            code.dataset.line = lineNumber++;
            code.textContent = `${line}\n`;
            pre.appendChild(code);
          }
          while (!pre.firstChild.textContent.trim()) pre.removeChild(pre.firstChild);
          while (!pre.lastChild.textContent.trim()) pre.removeChild(pre.lastChild);
        } else {
          const content = document.createElement('code');
          content.textContent = code.textContent;
          pre.appendChild(content);
        }
        pre.className = code.className;
        return pre;
      },
      wrapBlock: (pre, dataset, toolbar) => {
        const wrapper = document.createElement('div');
        const header = document.createElement('div');
        wrapper.classList.add('aqua-code-box');
        header.classList.add('aqua-code-header');

        if (!dataset.title) header.classList.add('empty');
        else header.textContent = dataset.title;
        if (!dataset.language) {
          pre.classList.add('language-none');
          header.setAttribute('data-language', '');
        } else {
          pre.classList.add(`language-${dataset.language}`);
          header.setAttribute('data-language', dataset.language);
        }

        header.appendChild(toolbar);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
        return wrapper;
      },

      init: function (container) {
        container = container || document.body;
        const snackbar = util.create.snackbar('code');
        for (const node of container.querySelectorAll('pre.aqua-code')) {
          if (node.getAttribute('data-aqua') === 'watered') continue;

          const pre = this.wrapCodes(node, node.dataset);
          pre.setAttribute('data-aqua', 'watered');
          const wrapper = this.wrapBlock(pre, node.dataset, this.createToolbar(pre, snackbar));

          node.replaceWith(wrapper);
        }
        this.highlight();
        container.setAttribute('data-aqua', 'watered');
      },
    },

    form: {
      wrapInput: (input) => {
        const label = document.createElement('label');
        const placeholder = document.createElement('span');
        label.htmlFor = input.type;
        input.placeholder = ' ';
        placeholder.textContent = input.placeholder;
        placeholder.textContent.charAt(0).toUpperCase();
        label.appendChild(input);
        label.appendChild(placeholder);
        return label;
      },

      init: function (container) {
        container = container || document.body;
        const snackbar = util.create.snackbar('form');
        for (const form of container.querySelectorAll('form.aqua-form')) {
          for (const input of form.querySelectorAll('input')) {
            input.replaceWith(this.wrapInput(document.cloneNode(input)));
          }
        }
      },
    },

    modal: {
      createCloseButton: () => {
        const close = document.createElement('a');
        const closeIcon = document.createElement('i');
        close.className = 'close';
        closeIcon.className = 'fas fa-window-close';
        close.appendChild(closeIcon);
        close.addEventListener('click', popup.classList.remove('pop'));
      },
      overlay: {
        addIcon: () => {
          const icon = document.createElement('i');
          icon.className = 'fas fa-plus';
          return icon;
        },
        eventPop: (el) => {
          el.addEventListener('click', () => {
            popup.classList.add('pop');
            document.body.style.overflow = 'hidden';
          });
        },
        eventClose: (el) => {
          el.addEventListener('click', () => {
            popup.classList.remove('pop');
            document.body.style.overflow = 'unset';
          });
        },
      },

      init: function (container) {
        container = container || document.body;
        const snackbar = util.create.snackbar('modal');
        for (const modal of document.querySelectorAll('.aqua-modal')) {
          const popup = modal.querySelector('.aqua-modal-popup');
          const content = popup.querySelector('.content');
          content.classList.add('aqua-modal-zoom');
          content.insertAdjacentElement('afterbegin', this.createCloseButton());

          for (const preview of modal.querySelectorAll('.aqua-modal-preview')) {
            preview.querySelectorAll('.overlay').forEach((overlay) => {
              overlay.appendChild(this.overlay.addIcon());
            });
            this.overlay.eventPop(preview);
          }

          popup.querySelectorAll('.close').forEach((close) => {
            this.overlay.eventClose(close);
          });
        }
      },
    },

    tsunami: function () {
      this.code.init();
      this.form.init();
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => Aqua.tsunami());
