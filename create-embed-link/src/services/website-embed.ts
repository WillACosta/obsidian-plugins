import { Notice } from 'obsidian'

import { ObsidianEditor } from './obsidian-editor'
import { BaseEmbedService } from 'src/core/types'

export class WebSiteEmbedService implements BaseEmbedService {
  constructor(private _obsidianEditor: ObsidianEditor) {}

  private _getPlaceholder(): string {
    const placeholderId = `embed-placeholder-${Date.now()}`
    return `
      <div class="rich-link-placeholder" id="${placeholderId}">
        Fetching preview…
      </div>
    `
  }

  getTemplate(...args: string[]) {
    const [url, image, title, description] = args

    return `
      <div class="rich-link">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          ${image ? `<img src="${image}" alt="${title}" />` : ''}
          <div>
            <h4>${title || 'Untitled'}</h4>
            <p>${description || ''}</p>
            <p>${url}</p>
          </div>
        </a>
      </div>
    `
  }

  async embed(url: string): Promise<void> {
    await this._obsidianEditor.insertPlaceholderThenReplace(this._getPlaceholder(), async () => {
      let embedHtml = ''

      try {
        const res = await fetch(url)
        const text = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')

        const ogTitle =
          doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || url
        const ogDescription =
          doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || ''
        const ogImage =
          doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || ''

        embedHtml = this.getTemplate(url, ogImage, ogTitle, ogDescription)
      } catch (err) {
        console.error(err)
        new Notice('⚠️ Failed to fetch metadata; inserting simple link')
        embedHtml = `<div class="rich-link"><a href="${url}" target="_blank">${url}</a></div>`
      }

      return embedHtml
    })
  }
}
