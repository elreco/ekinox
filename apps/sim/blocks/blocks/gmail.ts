import { GmailIcon } from '@/components/icons'
import type { BlockConfig } from '@/blocks/types'
import { AuthMode } from '@/blocks/types'
import type { GmailToolResponse } from '@/tools/gmail/types'

export const GmailBlock: BlockConfig<GmailToolResponse> = {
  type: 'gmail',
  name: 'Gmail',
  description: 'Send and draft Gmail emails',
  authMode: AuthMode.OAuth,
  longDescription:
    'Integrate Gmail into the workflow. Can send and draft emails.',
  docsLink: 'https://docs.ekinox.app/tools/gmail',
  category: 'tools',
  bgColor: '#E0E0E0',
  icon: GmailIcon,
  triggerAllowed: false,
  subBlocks: [
    // Operation selector
    {
      id: 'operation',
      title: 'Operation',
      type: 'dropdown',
      layout: 'full',
      options: [
        { label: 'Send Email', id: 'send_gmail' },
        { label: 'Draft Email', id: 'draft_gmail' },
      ],
      value: () => 'send_gmail',
    },
    // Gmail Credentials
    {
      id: 'credential',
      title: 'Gmail Account',
      type: 'oauth-input',
      layout: 'full',
      provider: 'google-email',
      serviceId: 'gmail',
      requiredScopes: [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.labels',
      ],
      placeholder: 'Select Gmail account',
      required: true,
    },
    // Send Email Fields
    {
      id: 'to',
      title: 'To',
      type: 'short-input',
      layout: 'full',
      placeholder: 'Recipient email address',
      condition: { field: 'operation', value: ['send_gmail', 'draft_gmail'] },
      required: true,
    },
    {
      id: 'subject',
      title: 'Subject',
      type: 'short-input',
      layout: 'full',
      placeholder: 'Email subject',
      condition: { field: 'operation', value: ['send_gmail', 'draft_gmail'] },
      required: true,
    },
    {
      id: 'body',
      title: 'Body',
      type: 'long-input',
      layout: 'full',
      placeholder: 'Email content',
      condition: { field: 'operation', value: ['send_gmail', 'draft_gmail'] },
      required: true,
    },
    // Advanced Settings - Additional Recipients
    {
      id: 'cc',
      title: 'CC',
      type: 'short-input',
      layout: 'full',
      placeholder: 'CC recipients (comma-separated)',
      condition: { field: 'operation', value: ['send_gmail', 'draft_gmail'] },
      mode: 'advanced',
      required: false,
    },
    {
      id: 'bcc',
      title: 'BCC',
      type: 'short-input',
      layout: 'full',
      placeholder: 'BCC recipients (comma-separated)',
      condition: { field: 'operation', value: ['send_gmail', 'draft_gmail'] },
      mode: 'advanced',
      required: false,
    },
    // ==================================================================================
    // DISABLED: The following features require CASA-restricted scopes
    // (gmail.readonly and gmail.modify) which are not available without certification
    // To re-enable: Uncomment these blocks and update the tools.access array below
    // ==================================================================================
    // // Label/folder selector (basic mode)
    // {
    //   id: 'folder',
    //   title: 'Label',
    //   type: 'folder-selector',
    //   layout: 'full',
    //   canonicalParamId: 'folder',
    //   provider: 'google-email',
    //   serviceId: 'gmail',
    //   requiredScopes: [
    //     'https://www.googleapis.com/auth/gmail.readonly',
    //     'https://www.googleapis.com/auth/gmail.labels',
    //   ],
    //   placeholder: 'Select Gmail label/folder',
    //   dependsOn: ['credential'],
    //   mode: 'basic',
    //   condition: { field: 'operation', value: 'read_gmail' },
    // },
    // // Manual label/folder input (advanced mode)
    // {
    //   id: 'manualFolder',
    //   title: 'Label/Folder',
    //   type: 'short-input',
    //   layout: 'full',
    //   canonicalParamId: 'folder',
    //   placeholder: 'Enter Gmail label name (e.g., INBOX, SENT, or custom label)',
    //   mode: 'advanced',
    //   condition: { field: 'operation', value: 'read_gmail' },
    // },
    // {
    //   id: 'unreadOnly',
    //   title: 'Unread Only',
    //   type: 'switch',
    //   layout: 'full',
    //   condition: { field: 'operation', value: 'read_gmail' },
    // },
    // {
    //   id: 'includeAttachments',
    //   title: 'Include Attachments',
    //   type: 'switch',
    //   layout: 'full',
    //   condition: { field: 'operation', value: 'read_gmail' },
    // },
    // {
    //   id: 'messageId',
    //   title: 'Message ID',
    //   type: 'short-input',
    //   layout: 'full',
    //   placeholder: 'Enter message ID to read (optional)',
    //   condition: {
    //     field: 'operation',
    //     value: 'read_gmail',
    //     and: {
    //       field: 'folder',
    //       value: '',
    //     },
    //   },
    // },
    // // Search Fields
    // {
    //   id: 'query',
    //   title: 'Search Query',
    //   type: 'short-input',
    //   layout: 'full',
    //   placeholder: 'Enter search terms',
    //   condition: { field: 'operation', value: 'search_gmail' },
    //   required: true,
    // },
    // {
    //   id: 'maxResults',
    //   title: 'Max Results',
    //   type: 'short-input',
    //   layout: 'full',
    //   placeholder: 'Maximum number of results (default: 10)',
    //   condition: { field: 'operation', value: ['search_gmail', 'read_gmail'] },
    // },
    // // TRIGGER MODE: Trigger configuration (only shown when trigger mode is active)
    // {
    //   id: 'triggerConfig',
    //   title: 'Trigger Configuration',
    //   type: 'trigger-config',
    //   layout: 'full',
    //   triggerProvider: 'gmail',
    //   availableTriggers: ['gmail_poller'],
    // },
  ],
  tools: {
    access: ['gmail_send', 'gmail_draft'],
    config: {
      tool: (params) => {
        switch (params.operation) {
          case 'send_gmail':
            return 'gmail_send'
          case 'draft_gmail':
            return 'gmail_draft'
          default:
            throw new Error(`Invalid Gmail operation: ${params.operation}`)
        }
      },
      params: (params) => {
        const { credential, ...rest } = params

        return {
          ...rest,
          credential,
        }
      },
    },
  },
  inputs: {
    operation: { type: 'string', description: 'Operation to perform' },
    credential: { type: 'string', description: 'Gmail access token' },
    // Send operation inputs
    to: { type: 'string', description: 'Recipient email address' },
    subject: { type: 'string', description: 'Email subject' },
    body: { type: 'string', description: 'Email content' },
    cc: { type: 'string', description: 'CC recipients (comma-separated)' },
    bcc: { type: 'string', description: 'BCC recipients (comma-separated)' },
    // DISABLED: Read/Search operation inputs (requires CASA certification)
    // folder: { type: 'string', description: 'Gmail folder' },
    // manualFolder: { type: 'string', description: 'Manual folder name' },
    // messageId: { type: 'string', description: 'Message identifier' },
    // unreadOnly: { type: 'boolean', description: 'Unread messages only' },
    // includeAttachments: { type: 'boolean', description: 'Include email attachments' },
    // query: { type: 'string', description: 'Search query' },
    // maxResults: { type: 'number', description: 'Maximum results' },
  },
  outputs: {
    // Tool outputs
    content: { type: 'string', description: 'Response content' },
    metadata: { type: 'json', description: 'Email metadata' },
    attachments: { type: 'json', description: 'Email attachments array' },
    // DISABLED: Trigger outputs (requires CASA certification)
    // email_id: { type: 'string', description: 'Gmail message ID' },
    // thread_id: { type: 'string', description: 'Gmail thread ID' },
    // subject: { type: 'string', description: 'Email subject line' },
    // from: { type: 'string', description: 'Sender email address' },
    // to: { type: 'string', description: 'Recipient email address' },
    // cc: { type: 'string', description: 'CC recipients (comma-separated)' },
    // date: { type: 'string', description: 'Email date in ISO format' },
    // body_text: { type: 'string', description: 'Plain text email body' },
    // body_html: { type: 'string', description: 'HTML email body' },
    // labels: { type: 'string', description: 'Email labels (comma-separated)' },
    // has_attachments: { type: 'boolean', description: 'Whether email has attachments' },
    // raw_email: { type: 'json', description: 'Complete raw email data from Gmail API (if enabled)' },
    // timestamp: { type: 'string', description: 'Event timestamp' },
  },
  triggers: {
    enabled: false,
    available: [],
  },
}
