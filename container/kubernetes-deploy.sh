#!/bin/bash

set -e

CONTAINER_SCRIPTS_DIR="$(dirname $0)"
ROOT_DIR="$CONTAINER_SCRIPTS_DIR/.."

KUBE_ENV="$1"

if [ "$KUBE_ENV" == "" ]; then
  echo "Usage: $0 <env>"
  echo "Where <env> is one of the following: docker, minikube, production"
  echo
  exit 1
fi

ENV_FILE="$CONTAINER_SCRIPTS_DIR/kubernetes-use-$KUBE_ENV.sh"
if [ ! -f "$ENV_FILE" ]; then
  echo "Error: Incorrect environment '$KUBE_ENV'!"
  echo
  exit 100
fi

set -x

# Switch the context
source "$ENV_FILE"

# Perform the deploy
export ENVIRONMENT=production
export REVISION=$(cd "$ROOT_DIR" && git rev-parse HEAD)
kubernetes-deploy $APP_NAME $KUBECONTEXT --bindings=app_name=$APP_NAME
