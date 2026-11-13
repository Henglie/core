import { describe, expect, it } from 'vitest'

import { socialOptions } from './constants'

const themeSupportedSocialTypes = [
  'github',
  'x',
  'twitter',
  'bluesky',
  'telegram',
  'discord',
  'weibo',
  'bilibili',
  'netease',
  'steam',
  'qq',
  'wechat',
  'mail',
  'rss',
]

describe('socialOptions', () => {
  it('offers every social type the bundled theme can render', () => {
    expect(socialOptions.map((option) => option.value)).toEqual(
      expect.arrayContaining(themeSupportedSocialTypes),
    )
  })

  it('has unique values and a label for every option', () => {
    const values = socialOptions.map((option) => option.value)
    expect(new Set(values).size).toBe(values.length)

    for (const option of socialOptions) {
      expect(option.label ?? option.labelKey).toBeTruthy()
    }
  })
})
