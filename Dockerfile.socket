FROM oven/bun:1 as base
WORKDIR /app

# Copy everything from the monorepo root
COPY . .

# Install dependencies without running scripts
RUN bun install --ignore-scripts

# Expose port
EXPOSE 3002

# Start the socket server using the same command as local
CMD ["bun", "run", "dev:sockets"]
