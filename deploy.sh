#!/bin/bash
cd /var/www/cafe-shop
git fetch origin deploy-local
if [ $(git rev-parse HEAD) != $(git rev-parse origin/deploy-local) ]; then
  echo "🔄 Changes detected, updating..."
  git pull origin deploy-local
  . ~/.nvm/nvm.sh && pnpm install --omit=dev
  . ~/.nvm/nvm.sh && pnpm run build
  . ~/.nvm/nvm.sh && pm2 restart next-app
  echo "✅ Updated successfully!!"
else
  echo "✅ No changes, skipping build."
fi
echo "Deployment finished at $(date)"