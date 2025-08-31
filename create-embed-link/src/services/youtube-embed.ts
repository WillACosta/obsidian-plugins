import { Notice } from 'obsidian'

import { EmbedService } from 'src/core/types'
import { ObsidianEditor } from './obsidian-editor'

export class YouTubeEmbedService implements EmbedService {
  constructor(private _obsidianEditor: ObsidianEditor) {}

  private _regex: RegExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/

  private _extractVideoId(url: string) {
    const match = url.match(this._regex)
    return match ? match[1] : ''
  }

  hasUrlMatch(url: string): boolean {
    return this._regex.test(url)
  }

  getTemplate(...args: string[]) {
    const [videoId, title = 'Video', width = '100%', height = 315] = args

    return `
      <iframe
        style="border-radius:12px"
        width="${width}"
        height="${height}"
        src="https://www.youtube.com/embed/${videoId}"
        title="${title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `
  }

  embed(url: string): void {
    if (!this.hasUrlMatch) {
      new Notice('⚠️ URL does not match YouTube pattern.')
      return
    }

    const videoId = this._extractVideoId(url)
    const template = this.getTemplate(videoId, 'YouTube Video')

    return this._obsidianEditor.insertHtmlAtSelectionOrCursor(template)
  }
}