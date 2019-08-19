#!/bin/sh
DEPLOY_FILES="assets js styles views index.html"

echo "Deploying låfteweb"
DEPLOY_DIR="/home/cassarossa/laafte/web/"
echo "Absolute path to deploy directory (leave empty for $DEPLOY_DIR):"
read INPUT_DEPLOY_DIR;
if [ ! -z "$INPUT_DEPLOY_DIR" ]
then
    DEPLOY_DIR=$INPUT_DEPLOY_DIR
fi
echo "Deploying to $DEPLOY_DIR"
cp -r -v $DEPLOY_FILES $DEPLOY_DIR
