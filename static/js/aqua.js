/*! Aqua v20.0.0 by @ignatiusmb - mauss.dev
 *  Copyright (c) 2020 Ignatius Bagus
 *  MIT Licensed -> github.com/ignatiusmb/aqua
 *  https://aqua.mauss.dev
 */

const Aqua = (function () {
	const cache = { toolbar: { add: null, remove: null } };
	const util = {
		checkTimeout: 240,
		create: {
			icon: (name) => {
				const tool = document.createElement('a');
				tool.className = `aqua-ctb-item`;
				tool.style.padding = `${0.25}em`;
				tool.style.backgroundSize = 'contain';
				tool.style.backgroundRepeat = 'no-repeat';
				tool.style.backgroundOrigin = 'content-box';
				if (name === 'clipboard') {
					tool.style.backgroundImage = `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-clipboard'%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'%3E%3C/path%3E%3Crect x='8' y='2' width='8' height='4' rx='1' ry='1'%3E%3C/rect%3E%3C/svg%3E")`;
				} else if (name === 'list') {
					tool.style.backgroundImage = `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-list'%3E%3Cline x1='8' y1='6' x2='21' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='8' y1='18' x2='21' y2='18'%3E%3C/line%3E%3Cline x1='3' y1='6' x2='3.01' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='12' x2='3.01' y2='12'%3E%3C/line%3E%3Cline x1='3' y1='18' x2='3.01' y2='18'%3E%3C/line%3E%3C/svg%3E")`;
				}
				return tool;
			},

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

			toolbar: function (pre, snackbar) {
				const toolbar = document.createElement('div');
				toolbar.className = 'aqua-code-toolbar';
				const createTool = (description, iconElement, clickCallback) => {
					const tooltip = document.createElement('span');
					tooltip.className = 'aqua-ctb-tooltip';
					tooltip.innerText = description;
					iconElement.appendChild(tooltip);
					iconElement.addEventListener('click', clickCallback);
					return iconElement;
				};

				// Toggle Numbering Button
				toolbar.appendChild(
					createTool('Toggle Numbering', this.icon('list'), () => {
						pre.classList.toggle('numbered');
					})
				);

				// Copy Code Button
				toolbar.appendChild(
					createTool('Copy', this.icon('clipboard'), () => {
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
