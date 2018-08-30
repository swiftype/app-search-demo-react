#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."
GIT_REV=$(cd "$ROOT_DIR" && git rev-parse HEAD)

source "$ROOT_DIR/container/_app_name.sh"

export ENVIRONMENT=${ENVIRONMENT:-production}
export REVISION=${GIT_REV}

export KUBECONFIG=${KUBECONFIG:-~/.kube/config}

if [ "${KUBECONTEXT}" == "" ]; then
  export KUBECONTEXT=$(kubectl config current-context)
fi

if [ "${KUBECONTEXT}" == "" ]; then
  export KUBECONTEXT="minikube"
fi

kubectl config set-context $KUBECONTEXT --namespace=$APP_NAME
kubectl config use-context $KUBECONTEXT

# With k8s 1.9+ we could use --field-selector=status.phase=Running, but our prod is 1.8 still
APP_POD=$(kubectl get pods -l=app=node-backend -o json | jq -r '.items[] | select(.status.phase == "Running") | .metadata.name')

if [ "$APP_POD" == "" ]; then
  echo "ERROR: Could not find the node-backend pod that would be used for running the command!"
  exit 2
fi

APP_CONTAINER="node-backend"

exec kubectl logs -f $APP_POD -c $APP_CONTAINER
