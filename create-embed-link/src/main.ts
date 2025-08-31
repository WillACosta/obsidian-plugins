import { Editor, Notice, Plugin } from 'obsidian'

import { NullableString } from './core/types'
import { FALLBACK_STYLES } from './core/constants'

import { DEFAULT_SETTINGS, EmbedLinkSettings, EmbedLinkSettingTab } from './settings'
import { InputModal } from './modal'

import {
  ObsidianEditor,
  SpotifyEmbedService,
  WebSiteEmbedService,
  YouTubeEmbedService,
} from './services'

export default class CreateEmbedLinkPlugin extends Plugin {
  settings!: EmbedLinkSettings
  private styleEl: HTMLStyleElement | null = null

  private async _handleURLInput(editor: Editor, url: NullableString) {
    const obsidianEditor = new ObsidianEditor(editor)
    const spotifyEmbed = new SpotifyEmbedService(obsidianEditor)
    const youtubeEmbed = new YouTubeEmbedService(obsidianEditor)
    const webSiteEmbed = new WebSiteEmbedService(obsidianEditor)

    if (!url) {
      new Notice('⚠️ Please provide a valid URL.')
      return
    }

    if (this.settings.enableSpotify && spotifyEmbed.hasUrlMatch(url)) {
      spotifyEmbed.embed(url)
    } else if (this.settings.enableYoutube && youtubeEmbed.hasUrlMatch(url)) {
      youtubeEmbed.embed(url)
    } else if (this.settings.enableGeneric) {
      webSiteEmbed.embed(url)
    } else {
      new Notice(
        "⚠️ All embed services are disabled in settings, or we don't support this URL yet.",
      )
    }
  }

  private _detachStyleEl() {
    if (this.styleEl && this.styleEl.parentElement) {
      this.styleEl.parentElement.removeChild(this.styleEl)
    }
    this.styleEl = null
  }

  async onload() {
    await this.loadSettings()
    this.addSettingTab(new EmbedLinkSettingTab(this.app, this))
    this.applyStyles()

    this.addCommand({
      id: 'embed-url',
      name: 'Embed URL',
      editorCallback: async (editor: Editor) => {
        let url = editor.getSelection().trim()

        if (!url) {
          const modal = new InputModal({
            app: this.app,
            title: 'Enter URL',
            placeholder: 'https://example.com',
            onSubmit: async value => {
              this._handleURLInput(editor, value)
            },
          })

          modal.open()
        } else {
          await this._handleURLInput(editor, url)
        }
      },
    })
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  onunload() {
    this._detachStyleEl()
  }

  applyStyles() {
    this._detachStyleEl()
    if (this.settings.useDefaultStyle) return

    this.styleEl = document.createElement('style')
    this.styleEl.setAttr('data-plugin', this.manifest.id)
    this.styleEl.textContent = FALLBACK_STYLES
    document.head.appendChild(this.styleEl)
  }
}
