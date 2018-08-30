#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."
GIT_REV=$(cd "$ROOT_DIR" && git rev-parse HEAD)

source "$ROOT_DIR/container/_app_name.sh"

BASE_TAG="docker.elastic.co/swiftype/$APP_NAME"
GIT_TAG="$BASE_TAG:$GIT_REV"

docker push "$GIT_TAG"

# Only push the latest from the master
if [ "$GIT_BRANCH" == "origin/master" ]; then
  docker push "$BASE_TAG:latest"
fi
