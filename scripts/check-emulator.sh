#!/bin/bash

# Script to check if emulator is enabled in .env.local

if [ ! -f .env.local ]; then
    echo "⚠️  .env.local file not found"
    exit 1
fi

if grep -q "NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true" .env.local; then
    echo "❌ WARNING: Emulator is ENABLED in .env.local"
    echo "   This will cause your app to use the local emulator instead of production Firebase!"
    echo ""
    echo "   To fix: Remove or comment out this line in .env.local:"
    echo "   NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true"
    echo ""
    exit 1
else
    echo "✅ Emulator is DISABLED - your app will use production Firebase"
    exit 0
fi

