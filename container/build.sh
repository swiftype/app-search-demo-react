#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."
GIT_REV=$(cd "$ROOT_DIR" && git rev-parse HEAD)

source "$ROOT_DIR/container/_app_name.sh"

BASE_TAG="docker.elastic.co/swiftype/$APP_NAME"
GIT_TAG="$BASE_TAG:$GIT_REV"

if [ "$NO_CACHE" != "" ]; then
  CACHE_ARG="--no-cache"
else
  CACHE_ARG=""
fi

docker build $CACHE_ARG --pull -t $GIT_TAG "$ROOT_DIR"
docker tag "$GIT_TAG" "$BASE_TAG:latest"
