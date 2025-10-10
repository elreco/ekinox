export async function GET() {
  const llmsContent = `# Ekinox - Visual AI Agent Workflow Builder
Ekinox is a visual AI agent workflow builder platform. Developers and businesses use Ekinox to build and deploy AI agent workflows without code.
Build powerful AI agents using our intuitive drag-and-drop interface.
Ekinox lets you integrate with 100+ apps to streamline workflows with AI agents. Built with enterprise-level security and compliance.

## Key Features
- Visual Workflow Builder: Drag-and-drop interface for creating AI agent workflows
- [Documentation](https://docs.ekinox.app): Complete guide to building AI agents

## Use Cases
- AI Agent Workflow Automation
- RAG Agents
- RAG Systems and Pipelines
- Chatbot Workflows
- Document Processing Workflows
- Customer Service Chatbot Workflows
- Ecommerce Agent Workflows
- Marketing Agent Workflows
- Deep Research Workflows
- Marketing Agent Workflows
- Real Estate Agent Workflows
- Financial Planning Agent Workflows
- Legal Agent Workflows

## Getting Started
- [Quick Start Guide](https://docs.ekinox.app/quickstart)
- [Website](https://www.ekinox.app)

## Resources
- [Website](https://www.ekinox.app)`

  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
