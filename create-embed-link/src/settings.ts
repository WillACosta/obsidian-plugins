import { PluginSettingTab, Setting } from 'obsidian'
import CreateEmbedLinkPlugin from './main'

export interface EmbedLinkSettings {
  useDefaultStyle: boolean
  theme: 'light' | 'dark' | 'auto'
  embedWidth: string
  embedHeight: string
  enableYoutube: boolean
  enableSpotify: boolean
  enableGeneric: boolean
}

export const DEFAULT_SETTINGS: EmbedLinkSettings = {
  useDefaultStyle: true,
  theme: 'auto',
  embedWidth: '100%',
  embedHeight: '152px',
  enableYoutube: true,
  enableSpotify: true,
  enableGeneric: true,
}

export class EmbedLinkSettingTab extends PluginSettingTab {
  plugin!: CreateEmbedLinkPlugin

  display(): void {
    const { containerEl } = this
    containerEl.empty()
    containerEl.createEl('h2', { text: 'Embed Link Settings' })

    new Setting(containerEl)
      .setName('Use default rich style (styles.css)')
      .setDesc(
        'Enable the plugin’s default link card styles (styles.css). If disabled, a minimal inline style is applied instead.',
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.useDefaultStyle).onChange(async v => {
          this.plugin.settings.useDefaultStyle = v
          await this.plugin.saveSettings()
          this.plugin.applyStyles()
        }),
      )

    new Setting(containerEl).setName('Embed width').addText(text =>
      text.setValue(this.plugin.settings.embedWidth).onChange(async v => {
        this.plugin.settings.embedWidth = v
        await this.plugin.saveSettings()
      }),
    )

    new Setting(containerEl).setName('Embed height').addText(text =>
      text.setValue(this.plugin.settings.embedHeight).onChange(async v => {
        this.plugin.settings.embedHeight = v
        await this.plugin.saveSettings()
      }),
    )

    containerEl.createEl('h3', { text: 'Enable services' })

    new Setting(containerEl).setName('YouTube').addToggle(toggle =>
      toggle.setValue(this.plugin.settings.enableYoutube).onChange(async v => {
        this.plugin.settings.enableYoutube = v
        await this.plugin.saveSettings()
      }),
    )

    new Setting(containerEl).setName('Spotify').addToggle(toggle =>
      toggle.setValue(this.plugin.settings.enableSpotify).onChange(async v => {
        this.plugin.settings.enableSpotify = v
        await this.plugin.saveSettings()
      }),
    )

    new Setting(containerEl).setName('Generic websites').addToggle(toggle =>
      toggle.setValue(this.plugin.settings.enableGeneric).onChange(async v => {
        this.plugin.settings.enableGeneric = v
        await this.plugin.saveSettings()
      }),
    )
  }
}
