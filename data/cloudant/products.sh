#!/bin/sh

# app base ROUTE (e.g. http://[NAME].mybluemix.net)
ROUTE=

# name of container
CONTAINER=commerce

# model name for loopback
MODEL=Product

# name of database
DATABASE=products

# input validation
if [[ -z "${ROUTE}" ]]; then
  echo "Please provide the application ROUTE. (e.g. http://[NAME].mybluemix.net)"
  exit
fi

# removes an extra backslash at the end of the ROUTE if pasted incorrectly
if [[ "${ROUTE}" == */ ]]; then
 ROUTE=$(echo ${ROUTE} | sed s/.$//)
fi

# using sed to replace ROUTE, CONTAINER, DATABASE, and MODEL
ROUTE=$(echo ${ROUTE} | sed s/\\//\\\\\\//g)
sed -e "s/\[ROUTE\]/${ROUTE}/g" -e "s/\[CONTAINER\]/${CONTAINER}/g" -e "s/\[MODEL\]/${MODEL}/g" products-template.json > ${DATABASE}.json
