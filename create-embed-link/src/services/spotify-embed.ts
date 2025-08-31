import { EmbedService } from 'src/core/types'
import { ObsidianEditor } from './obsidian-editor'
import { Notice } from 'obsidian'

export class SpotifyEmbedService implements EmbedService {
  constructor(private _obsidianEditor: ObsidianEditor) {}

  private _regex: RegExp =
    /(?:https?:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+))/

  private _extractParams(url: string): string[] {
    const match = url.match(this._regex)
    return match ? [match[2], match[2]] : []
  }

  hasUrlMatch(url: string): boolean {
    return this._regex.test(url)
  }

  getTemplate(...args: string[]) {
    const [id, type, width = '100%', height = 152] = args

    return `
      <iframe
        style="border-radius:12px"
        width="${width}"
        height="${height}"
        src="https://open.spotify.com/embed/${type}/${id}"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media">
      </iframe>
    `
  }

  embed(url: string): void {
    if (!this.hasUrlMatch(url)) {
      new Notice('URL does not match Spotify pattern.')
      return
    }

    const [id, type] = this._extractParams(url)
    const template = this.getTemplate(id, type)

    return this._obsidianEditor.insertHtmlAtSelectionOrCursor(template)
  }
}
