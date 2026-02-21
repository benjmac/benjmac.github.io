import React from 'react'
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from '@assistant-ui/react'

const MOCK_RESPONSES = [
  "Ben is a full-stack engineer with deep expertise in TypeScript, React, Node.js, and cloud infrastructure. He's passionate about clean architecture and great developer experience.",
  'Ben has worked across fintech, developer tooling, and enterprise software — building everything from internal developer platforms to AI-powered pipelines.',
  'Proficient in TypeScript, React, Angular, Node.js, Docker, Kubernetes, AWS, Terraform, RxJS, and more. Check out the Technologies page for the full breakdown!',
  'Ben is currently open to new opportunities. The best way to reach him is via LinkedIn or GitHub — links are in the top nav.',
  'Ben has experience building full-stack apps, CI/CD pipelines with GitHub Actions, Backstage developer portals, and AI tooling with RAG and AI Agents.',
  'On the data side, Ben has worked with SQL, D3.js visualisations, and various cloud-native data patterns. He also brings experience with Cypress and Jest for testing.',
  'Ben holds a strong interest in AI-assisted development and has hands-on experience with LLM tooling, prompt engineering, and agentic workflows.',
]

const mockAdapter: ChatModelAdapter = {
  async *run() {
    // Simulate a short typing delay like a real AI assistant
    await new Promise((resolve) => setTimeout(resolve, 850))
    const text =
      MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
    yield {content: [{type: 'text', text}]}
  },
}

export const ChatRuntimeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const runtime = useLocalRuntime(mockAdapter)

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}
