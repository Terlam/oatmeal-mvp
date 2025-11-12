# Firebase Setup Guide - thefamilyfunc

## ✅ What's Been Done

1. ✅ Created new Firebase project: `thefamilyfunc`
2. ✅ Updated `.firebaserc` to use `thefamilyfunc`
3. ✅ Hosting is configured (uses `out` directory)

## 🔧 What You Need to Do

### Step 1: Create Web App in Firebase Console

1. Go to: https://console.firebase.google.com/project/thefamilyfunc/settings/general
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** > Select **Web (</>)** icon
4. Register your app (you can name it anything, like "Web App")
5. Copy the Firebase config values that appear

### Step 2: Get Service Account Key

1. Go to: https://console.firebase.google.com/project/thefamilyfunc/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Download the JSON file
4. Copy the values from the JSON:
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` characters)

### Step 3: Update .env.local

Update your `.env.local` file with these values:

```bash
# Firebase Configuration for thefamilyfunc
NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thefamilyfunc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thefamilyfunc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thefamilyfunc.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>

# ⚠️ IMPORTANT: Remove or comment out this line for production!
# NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true

# Service Account
FIREBASE_PROJECT_ID=thefamilyfunc
FIREBASE_CLIENT_EMAIL=<your-service-account-email>
FIREBASE_PRIVATE_KEY_ID=<your-private-key-id>
FIREBASE_PRIVATE_KEY=<your-private-key-with-\n>
```

### Step 4: Enable Firebase Services

In the Firebase Console, enable these services:

1. **Authentication**: https://console.firebase.google.com/project/thefamilyfunc/authentication
   - Click "Get Started"
   - Enable "Google" sign-in provider
   - Enable "Email/Password" sign-in provider

2. **Firestore Database**: https://console.firebase.google.com/project/thefamilyfunc/firestore
   - Click "Create database"
   - Choose "Start in production mode" (we'll deploy rules)
   - Select location (e.g., `nam5` for US)

3. **Storage**: https://console.firebase.google.com/project/thefamilyfunc/storage
   - Click "Get Started"
   - Choose "Start in production mode" (we'll deploy rules)

### Step 5: Build and Deploy

```bash
# Make sure emulator is disabled
# Check .env.local - NEXT_PUBLIC_FIREBASE_USE_EMULATOR should NOT be set to 'true'

# Build the app
npm run build

# Deploy everything
firebase deploy
```

## 🎯 Your New URLs

- **Hosting**: https://thefamilyfunc.web.app
- **Console**: https://console.firebase.google.com/project/thefamilyfunc/overview

## ⚠️ Important Notes

1. **Emulator**: Make sure `NEXT_PUBLIC_FIREBASE_USE_EMULATOR` is NOT set to `'true'` in production
2. **Environment Variables**: The `.env.local` file is for local development. For production builds, these values are baked into the build
3. **Service Account**: Keep your service account key secure and never commit it to git

## 🐛 Troubleshooting

### Still using emulator?
- Check `.env.local` - remove or comment out `NEXT_PUBLIC_FIREBASE_USE_EMULATOR=true`
- Rebuild: `npm run build`
- Clear browser cache

### Can't sign in with Google?
- Make sure Google sign-in is enabled in Firebase Console
- Check that your OAuth consent screen is configured in Google Cloud Console

### Firestore/Storage not working?
- Make sure the services are enabled in Firebase Console
- Check that your rules are deployed: `firebase deploy --only firestore:rules,storage`

