#!/bin/bash

set -ex

ROOT_DIR="$(dirname $0)/.."

source "$ROOT_DIR/container/_app_name.sh"

export KUBECONFIG=${KUBECONFIG:-~/.kube/config}
export KUBECONTEXT=docker-for-desktop

kubectl config set-context $KUBECONTEXT --namespace=$APP_NAME
kubectl config use-context $KUBECONTEXT
