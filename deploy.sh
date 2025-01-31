#!/bin/bash

# 🚀 Start Minikube if it's not running
if ! minikube status | grep -q "Running"; then
    minikube start
fi

# 🐳 Use Minikube's Docker daemon
eval $(minikube docker-env)

# Get Minikube IP early to use in builds
MINIKUBE_IP=$(minikube ip)
BACKEND_URL="http://${MINIKUBE_IP}:30002"

# Update ConfigMap with correct IP - works on both Linux and macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # 🍏 macOS
    sed -i '' "s|192.168.49.2|$MINIKUBE_IP|g" k8s/configmap.yaml
else
    # 🐧 Linux
    sed -i "s|192.168.49.2|$MINIKUBE_IP|g" k8s/configmap.yaml
fi

# 🛠️ Build Docker images with environment variables
echo "🛠️ Building Docker images..."
docker build -t code-sync-backend:latest ./server
docker build -t code-sync-frontend:latest \
  --build-arg VITE_BACKEND_URL="${BACKEND_URL}" \
  ./client

# 🗑️ Delete all existing resources
echo "🗑️ Deleting existing deployments..."
kubectl delete all --all
kubectl delete configmap app-config || true

# 🗂️ Create ConfigMap
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  backend_url: '${BACKEND_URL}'
  frontend_url: 'http://${MINIKUBE_IP}:30001'
EOF

# 📄 Apply ConfigMap first
echo "📄 Applying ConfigMap..."
kubectl apply -f k8s/configmap.yaml

# 📦 Apply other Kubernetes manifests
echo "📦 Applying Kubernetes manifests..."
kubectl apply -f k8s/

# 🔄 Add imagePullPolicy: Never to the deployments
echo "🔄 Updating deployment policies..."
kubectl patch deployment backend -p '{"spec":{"template":{"spec":{"containers":[{"name":"backend","imagePullPolicy":"Never"}]}}}}'
kubectl patch deployment frontend -p '{"spec":{"template":{"spec":{"containers":[{"name":"frontend","imagePullPolicy":"Never"}]}}}}'

# ⏳ Wait for pods to be ready
echo "⏳ Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=backend --timeout=120s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=120s

echo "✅ Deployment complete!"
echo "🌐 Frontend is available at: http://$MINIKUBE_IP:30001"
echo "🌐 Backend is available at: http://$MINIKUBE_IP:30002"
