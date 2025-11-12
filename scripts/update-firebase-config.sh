#!/bin/bash

# Script to update Firebase config for thefamilyfunc project
# Run this after getting your config from Firebase Console

echo "🔥 Updating Firebase configuration for thefamilyfunc..."
echo ""
echo "Before running this, make sure you have:"
echo "1. Created a web app in Firebase Console: https://console.firebase.google.com/project/thefamilyfunc/settings/general"
echo "2. Got your Firebase config values"
echo "3. Got your service account key from Project Settings > Service Accounts"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local from template..."
    cp .env.local.example .env.local 2>/dev/null || touch .env.local
fi

echo ""
echo "Please enter your Firebase config values:"
echo ""

read -p "NEXT_PUBLIC_FIREBASE_API_KEY: " API_KEY
read -p "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: " SENDER_ID
read -p "NEXT_PUBLIC_FIREBASE_APP_ID: " APP_ID

# Update .env.local
cat > .env.local << EOF
# Firebase Configuration for thefamilyfunc
NEXT_PUBLIC_FIREBASE_API_KEY=${API_KEY}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thefamilyfunc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thefamilyfunc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thefamilyfunc.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${SENDER_ID}
NEXT_PUBLIC_FIREBASE_APP_ID=${APP_ID}

# IMPORTANT: Emulator is DISABLED for production
# Remove or comment out NEXT_PUBLIC_FIREBASE_USE_EMULATOR to use production Firebase

# Service Account (paste your full private key)
FIREBASE_PROJECT_ID=thefamilyfunc
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@thefamilyfunc.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY_ID=YOUR_PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n
EOF

echo ""
echo "✅ .env.local updated!"
echo ""
echo "⚠️  IMPORTANT: You still need to:"
echo "1. Update FIREBASE_CLIENT_EMAIL with your actual service account email"
echo "2. Update FIREBASE_PRIVATE_KEY_ID with your actual key ID"
echo "3. Update FIREBASE_PRIVATE_KEY with your actual private key"
echo ""
echo "Get these from: https://console.firebase.google.com/project/thefamilyfunc/settings/serviceaccounts/adminsdk"
echo ""
echo "After updating, run: npm run build && firebase deploy"

