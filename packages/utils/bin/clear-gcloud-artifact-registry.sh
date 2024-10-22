#!/bin/bash

# Variables
REPOSITORY_NAME="thegame"
LOCATION="us-east4"

# List all packages
echo "Listing all packages in the repository..."
PACKAGES=$(gcloud artifacts packages list --repository=$REPOSITORY_NAME --location=$LOCATION --format="value(name)")
COUNT=0
for PACKAGE in $PACKAGES; do
  echo "Processing: $PACKAGE"
  VERSIONS=$(gcloud artifacts versions list --repository=$REPOSITORY_NAME --location=$LOCATION --package=$PACKAGE --format="value(name)")
  for VERSION in $VERSIONS; do
    COUNT=$((COUNT + 1))
    echo "Deleting version: $COUNT:$PACKAGE:$VERSION"
    gcloud artifacts versions delete $VERSION --repository=$REPOSITORY_NAME --location=$LOCATION --package=$PACKAGE --quiet
  done
done
