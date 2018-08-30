#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."
GIT_REV=$(cd "$ROOT_DIR" && git rev-parse HEAD)

source "$ROOT_DIR/container/_app_name.sh"

BASE_TAG="docker.elastic.co/swiftype/$APP_NAME"
GIT_TAG="$BASE_TAG:$GIT_REV"

DOCKER_ARGS=""
if [ -f "$ROOT_DIR/.env.production.local" ]; then
  DOCKER_ARGS="$DOCKER_ARGS --env-file $ROOT_DIR/.env.production.local"
fi

docker run -it --rm --publish 3000:3000 $DOCKER_ARGS $GIT_TAG $*
