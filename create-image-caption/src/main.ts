import { Notice, Plugin } from 'obsidian'
import type { CreateImageCaptionSettings } from './settings'
import { CreateImageCaptionSettingTab, DEFAULT_SETTINGS } from './settings'

import { InputModal } from './modal'

export default class CreateImageCaptionPlugin extends Plugin {
  settings!: CreateImageCaptionSettings
  private styleEl: HTMLStyleElement | null = null

  async onload() {
    await this.loadSettings()

    this.addCommand({
      id: 'wrap-selection-in-caption',
      name: 'Wrap selection in caption',
      editorCallback: editor => {
        const sel = editor.getSelection()

        if (!sel) {
          new Notice('No selection to wrap.')
          return
        }

        const html = this.wrapHtml(sel)
        editor.replaceSelection(html)
      },
    })

    this.addCommand({
      id: 'add-caption-below-image',
      name: 'Add caption below current image',
      editorCallback: async editor => {
        const cursor = editor.getCursor()
        const line = editor.getLine(cursor.line)

        // Support Markdown + Wikilink images
        const imageRegex = /(!\[[^\]]*\]\([^)]+\))|(!\[\[[^\]]+\]\])/

        if (!imageRegex.test(line)) {
          new Notice('Cursor is not on an image line.')
          return
        }

        let content = editor.getSelection()

        if (!content) {
          const modal = new InputModal({
            app: this.app,
            placeholder: 'Just a black hole image.',
            title: 'Caption text',
          })

          modal.open()

          await new Promise<void>(resolve => {
            modal.onClose = resolve
            modal.open()
          })

          if (!modal.result) return
          content = modal.result
        }

        const html = this.wrapHtml(content)
        const indentMatch = line.match(/^\s*/)
        const indent = indentMatch ? indentMatch[0] : ''
        editor.replaceRange('\n' + indent + html + '\n', {
          line: cursor.line,
          ch: line.length,
        })
      },
    })

    this.addSettingTab(new CreateImageCaptionSettingTab(this.app, this))
    await this.applyStyles()
  }

  onunload() {
    this.detachStyleEl()
  }

  private wrapHtml(content: string): string {
    const tag = this.settings.tagName || 'span'
    const cls = this.settings.className || 'image-legend'
    return `<${tag} class="${cls}">${content}</${tag}>`
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async applyStyles() {
    const css = this.buildCss()
    if (!this.styleEl) {
      this.styleEl = document.createElement('style')
      this.styleEl.setAttr('data-plugin', this.manifest.id)
      document.head.appendChild(this.styleEl)
      this.register(() => this.detachStyleEl())
    }
    this.styleEl.textContent = css
  }

  private detachStyleEl() {
    if (this.styleEl && this.styleEl.parentElement) {
      this.styleEl.parentElement.removeChild(this.styleEl)
    }
    this.styleEl = null
  }

  private buildCss(): string {
    const cls = this.settings.className || 'image-legend'

    const defaultCss = this.settings.enableDefaultStyles
      ? `.${cls} {\n font-size: smaller;\n color: #637282;\n font-style: italic;\n display: block;\n text-align: center;\n margin-top: 0.25rem;\n}`
      : ''

    const userCss = this.settings.customCss?.trim() || ''

    return [defaultCss, userCss].filter(Boolean).join('\n\n')
  }
}
