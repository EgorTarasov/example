#!/bin/bash

# Set variables
GITHUB_USERNAME="egortarasov"
GITHUB_REPO="example"
BACKEND_IMAGE="backend"
GRAFANA_IMAGE="grafana"
TAG="latest"
# Build backend image
echo "Building backend image..."
docker build -t ghcr.io/$GITHUB_USERNAME/$GITHUB_REPO/$BACKEND_IMAGE:$TAG -f ./backend/Dockerfile.backend ./backend

# Push backend image
echo "Pushing backend image to GitHub Container Registry..."
docker push ghcr.io/$GITHUB_USERNAME/$GITHUB_REPO/$BACKEND_IMAGE:$TAG

# Build grafana image
echo "Building grafana image..."
docker build -t ghcr.io/$GITHUB_USERNAME/$GITHUB_REPO/$GRAFANA_IMAGE:$TAG -f ./grafana/Dockerfile.grafana 

# Push grafana image
echo "Pushing grafana image to GitHub Container Registry..."
docker push ghcr.io/$GITHUB_USERNAME/$GITHUB_REPO/$GRAFANA_IMAGE:$TAG

echo "Done!"