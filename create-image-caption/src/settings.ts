import { App, PluginSettingTab, Setting } from 'obsidian'
import type CreateImageCaptionPlugin from './main'

export interface CreateImageCaptionSettings {
  tagName: string // e.g. 'span', 'figcaption', 'div'
  className: string // e.g. 'image-caption'
  enableDefaultStyles: boolean
  customCss: string // user-defined CSS appended after default
}

export const DEFAULT_SETTINGS: CreateImageCaptionSettings = {
  tagName: 'figcaption',
  className: 'image-caption',
  enableDefaultStyles: true,
  customCss: '',
}

export class CreateImageCaptionSettingTab extends PluginSettingTab {
  plugin: CreateImageCaptionPlugin

  constructor(app: App, plugin: CreateImageCaptionPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()

    containerEl.createEl('h2', { text: 'Create Image Caption — Settings' })

    new Setting(containerEl)
      .setName('Tag name')
      .setDesc(
        'HTML tag to use for the caption wrapper (e.g., span, div, figcaption)',
      )
      .addText((text) =>
        text
          .setPlaceholder('span')
          .setValue(this.plugin.settings.tagName)
          .onChange(async (value) => {
            this.plugin.settings.tagName = (value || 'figcaption').trim()
            await this.plugin.saveSettings()
          }),
      )

    new Setting(containerEl)
      .setName('Class name')
      .setDesc('CSS class applied to the caption element')
      .addText((text) =>
        text
          .setPlaceholder('image-legend')
          .setValue(this.plugin.settings.className)
          .onChange(async (value) => {
            this.plugin.settings.className = (value || 'image-caption').trim()
            await this.plugin.saveSettings()
            await this.plugin.applyStyles()
          }),
      )

    new Setting(containerEl)
      .setName('Enable default styles')
      .setDesc(
        'If enabled, the plugin injects a sensible default appearance for captions.',
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableDefaultStyles)
          .onChange(async (v) => {
            this.plugin.settings.enableDefaultStyles = v
            await this.plugin.saveSettings()
            await this.plugin.applyStyles()
          }),
      )

    new Setting(containerEl)
      .setName('Custom CSS')
      .setDesc(
        'Optional CSS appended after the default styles. Leave blank to rely only on defaults or your theme.',
      )
      .addTextArea((ta) => {
        ta.setPlaceholder(
          `/* Example:\n.${this.plugin.settings.className} {\n color: #637282;\n} */`,
        )
          .setValue(this.plugin.settings.customCss)
          .onChange(async (value) => {
            this.plugin.settings.customCss = value
            await this.plugin.saveSettings()
            await this.plugin.applyStyles()
          })
        ta.inputEl.rows = 8
        ta.inputEl.cols = 50
      })
  }
}
