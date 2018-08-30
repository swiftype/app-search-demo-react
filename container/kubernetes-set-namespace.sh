#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."

source "$ROOT_DIR/container/_app_name.sh"

export KUBECONFIG=${KUBECONFIG:-~/.kube/config}

if [ "${KUBECONTEXT}" == "" ]; then
  export KUBECONTEXT=$(kubectl config current-context)
fi

if [ "${KUBECONTEXT}" == "" ]; then
  export KUBECONTEXT="minikube"
fi

kubectl config set-context $KUBECONTEXT --namespace=$APP_NAME
