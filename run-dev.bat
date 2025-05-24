#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to that directory
cd "$SCRIPT_DIR" || { echo "Directory not found: $SCRIPT_DIR"; exit 1; }

# Run the Electron app
npm run start:electron