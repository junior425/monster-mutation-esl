#!/usr/bin/env sh
# Regenerates public/manual-monster-mutation.pdf from docs/manual/manual.html (needs Chrome/Chromium).
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --no-sandbox \
  --print-to-pdf="public/manual-monster-mutation.pdf" "file://$PWD/docs/manual/manual.html"
