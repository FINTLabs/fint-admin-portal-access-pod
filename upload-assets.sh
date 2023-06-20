#!/bin/bash
if [[ -f "build/static/js/main.js" ]]; then
  # Alpha
  az storage blob upload \
    --file "build/static/js/main.js" \
    --container-name "alpha/$1" \
    --account-name stflaiscdn \
    --name main.js \
    --overwrite

  # Beta
  az storage blob upload \
    --file "build/static/js/main.js" \
    --container-name "beta/$1" \
    --account-name stflaiscdn \
    --name main.js \
    --overwrite

  # Api
  az storage blob upload \
    --file "build/static/js/main.js" \
    --container-name "api/$1" \
    --account-name stflaiscdn \
    --name main.js \
    --overwrite
fi

if [[ -f "build/static/css/main.css" ]]; then
  # Alpha
  az storage blob upload \
    --file "build/static/css/main.css" \
    --container-name "alpha/$1" \
    --account-name stflaiscdn \
    --name main.css \
    --overwrite

  # Beta
  az storage blob upload \
    --file "build/static/css/main.css" \
    --container-name "beta/$1" \
    --account-name stflaiscdn \
    --name main.css \
    --overwrite

  # Api
  az storage blob upload \
    --file "build/static/css/main.css" \
    --container-name "api/$1" \
    --account-name stflaiscdn \
    --name main.css \
    --overwrite
fi


