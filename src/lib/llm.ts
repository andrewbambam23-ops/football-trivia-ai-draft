import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const promptsDir = path.resolve(process.cwd(), 'prompts')

async function loadPrompt(name: string) {
  const p = path.join(promptsDir, `${name}.json`)
  if (!fs.existsSync(p)) throw new Error(`Prompt not found: ${name}`)
  const raw = await fs.promises.readFile(p, 'utf-8')
  return JSON.parse(raw)
}

export async function callLLM(promptName: string, payload: any) {
  const promptTemplate = await loadPrompt(promptName)
  // We'll send the system prompt and the payload as user content (JSON)
  const system = promptTemplate.system_prompt || ''
  const user = JSON.stringify({ payload })

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ],
    max_tokens: 1000,
    temperature: 0.0
  })

  const text = res.choices?.[0]?.message?.content ?? ''
  try {
    return JSON.parse(text)
  } catch (e) {
    // If not JSON, return raw text for debugging
    return text
  }
}
