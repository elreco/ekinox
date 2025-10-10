# Ekinox Packages

This directory contains internal packages used by the Ekinox platform.

## Available Packages

### Database Package (`db`)

**Directory:** `db/`

The database package contains the schema, migrations, and database utilities for Ekinox.

**Features:**
- Drizzle ORM schema definitions
- Database migrations
- Type-safe database queries
- Shared database utilities

**Usage:**
```typescript
import { db } from '@sim/db'
import { workflow, user } from '@sim/db/schema'
```

## Development

To work with these packages:

```bash
# Install dependencies
bun install

# Run migrations
cd packages/db
bun run migrate
```

## Support

For questions and support, contact us at help@www.ekinox.app

---

Made with ❤️ by the Ekinox Team
