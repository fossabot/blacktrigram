#!/bin/bash
set -e
# reuse init script for Xvfb + D-Bus
. "$(dirname "$0")/init-xvfb.sh"

echo "Verifying Cypress installation..."
npx cypress verify
