import { DesignToken } from 'style-dictionary/types/DesignToken'

export function isSemanticToken(token: DesignToken) {
  return token.original.value.startsWith('{')
}

export async function getJSONFromUrl<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return (await res.json()) as T
}

export async function getTxtFromUrl<T>(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  return await res.text()
}
