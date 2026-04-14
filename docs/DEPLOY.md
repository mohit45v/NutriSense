# NutriSense — Cloud Run Deployment Guide

## Prerequisites
- GCP project ready ✓
- gcloud CLI installed
- Docker installed

---

## Step 1: Enable APIs (run once)
```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable firestore.googleapis.com
gcloud services enable generativelanguage.googleapis.com
```

---

## Step 2: Create Artifact Registry Repo
```bash
gcloud artifacts repositories create nutrisense \
  --repository-format=docker \
  --location=asia-south1 \
  --description="NutriSense container"
```

---

## Step 3: Build & Push Docker Image
```bash
# Set your project ID
export PROJECT_ID=your-gcp-project-id
export REGION=asia-south1

# Build
docker build -t asia-south1-docker.pkg.dev/$PROJECT_ID/nutrisense/app:latest .

# Auth
gcloud auth configure-docker asia-south1-docker.pkg.dev

# Push
docker push asia-south1-docker.pkg.dev/$PROJECT_ID/nutrisense/app:latest
```

---

## Step 4: Deploy to Cloud Run
```bash
gcloud run deploy nutrisense \
  --image asia-south1-docker.pkg.dev/$PROJECT_ID/nutrisense/app:latest \
  --region asia-south1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars GEMINI_API_KEY=your_key_here \
  --set-env-vars FIRESTORE_PROJECT_ID=$PROJECT_ID \
  --set-env-vars NODE_ENV=production
```

---

## Step 5: Get Deployment URL
```bash
gcloud run services describe nutrisense \
  --region asia-south1 \
  --format='value(status.url)'
```

This URL is what you submit on hack2skill. ✓

---

## One-Command Redeploy Script
Save as `deploy.sh`:
```bash
#!/bin/bash
set -e
export PROJECT_ID=$(gcloud config get-value project)
export REGION=asia-south1
export IMAGE=asia-south1-docker.pkg.dev/$PROJECT_ID/nutrisense/app:latest

echo "Building..."
docker build -t $IMAGE .

echo "Pushing..."
docker push $IMAGE

echo "Deploying..."
gcloud run deploy nutrisense \
  --image $IMAGE \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 8080

echo "Done! URL:"
gcloud run services describe nutrisense --region $REGION --format='value(status.url)'
```

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Firestore Setup
```bash
# Create Firestore database
gcloud firestore databases create --region=asia-south1

# Collection structure:
# meals/{userId}/{mealId}
#   - mealName: string
#   - healthScore: number
#   - calories: number
#   - timestamp: timestamp
#   - improvements: array
```

---

## Environment Variables Checklist
- [ ] GEMINI_API_KEY — from Google AI Studio (aistudio.google.com)
- [ ] FIRESTORE_PROJECT_ID — your GCP project ID
- [ ] NODE_ENV=production

---

## Submission Checklist for hack2skill
- [ ] App deployed and accessible via public URL
- [ ] GitHub repo public with all source code
- [ ] README.md with setup instructions
- [ ] All tests passing (npm test)
- [ ] No API keys committed to git
- [ ] .env.local in .gitignore ✓
