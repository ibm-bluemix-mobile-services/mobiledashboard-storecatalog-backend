#!/bin/sh

### run "cf target" to see current settings and enter them here if correct

# org: (e.g. jmeis@us.ibm.com)
TARGET=

# space: (e.g. dev)
SPACE=

# api endpoint: (e.g. https://api.ng.bluemix.net)
REGION=

# app name: (e.g. mobile-commerce)
# must be unique!
# verify by going to http://[NAME].mybluemix.net/ to see if someone already took the name
NAME=

# input validation
if [ -z "${TARGET}" ]; then
    echo "Please provide your intended TARGET."
    exit
fi
if [ -z "${SPACE}" ]; then
    echo "Please provide your intended SPACE."
    exit
fi
if [ -z "${REGION}" ]; then
    echo "Please provide your intended REGION."
    exit
fi
if [ -z "${NAME}" ]; then
    echo "Please provide your application NAME."
    exit
fi

cf api $REGION
cf target -o $TARGET -s $SPACE

cat > ../backend/api/manifest.yml << EOF
applications:
- path: .
  memory: 512M
  instances: 1
  domain: mybluemix.net
  name: $NAME
  host: $NAME
  disk_quota: 1024M
  services:
  - $NAME-AdvancedMobileAccess
  - $NAME-IMFPush
  - $NAME-CloudantNoSQLDB
  - $NAME-ObjectStorage
EOF

cf create-service AdvancedMobileAccess Bronze $NAME-AdvancedMobileAccess
cf create-service imfpush Basic $NAME-IMFPush
cf create-service cloudantNoSQLDB Shared $NAME-CloudantNoSQLDB
cf create-service Object-Storage Free $NAME-ObjectStorage

cd ../backend/api/
cf push
