#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[1/6] Adding Helm repo"
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts >/dev/null 2>&1 || true
helm repo update

echo "[2/6] Installing/upgrading kube-prometheus-stack"
helm upgrade --install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values "$ROOT_DIR/monitoring/prometheus-values.yaml"

echo "[3/6] Waiting for monitoring namespace pods"
kubectl wait --for=condition=Ready pods --all -n monitoring --timeout=300s

echo "[4/6] Applying alert rules"
kubectl apply -f "$ROOT_DIR/monitoring/alert-rules.yaml"

echo "[5/6] Monitoring services"
kubectl get svc -n monitoring

echo "[6/6] Done"
echo "Grafana URL: http://<WORKER_PUBLIC_IP>:30300"
echo "Grafana login: admin / CropAdvisor@123"
echo "Suggested dashboard IDs to import: 6417, 15760, 1860"
