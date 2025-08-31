export interface BaseEmbedService {
  embed: (url: string) => void
  getTemplate: (...args: string[]) => string
}

export interface EmbedService extends BaseEmbedService {
  hasUrlMatch(url: string): boolean
}
