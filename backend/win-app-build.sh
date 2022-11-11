#!/bin/bash
clear
printf "################################################"
printf "Creating Windows 64 Build"
printf "################################################"

printf "\n Building app distributions - Started"
npm run build
printf "\n Building app distributions - Completed\n\n"

printf "\n Creating Folders - Started"
mkdir -p win-build/node_modules
mkdir -p win-build/config
mkdir -p win-build/migrations
printf "\n Creating Folders - Completed\n\n"

printf "\n Copying app distributions - Started"
cp -r dist/* win-build
printf "\n Copying app distributions - Completed\n\n"

printf "\n Copying build assets - Started"
cp -r win-app-build-assets/* win-build
printf "\n Copying build assets - Completed\n\n"

printf "\n Copying node modules - Started"
cp -r node_modules/* win-build/node_modules
printf "\n Copying node modules - Completed\n\n"

printf "\n Copying configuration files - Started"

cp -r config/* win-build/config
printf "\n Copying configuration files - Completed\n\n"

printf "\n Copying Migrations files - Started"
cp -r migrations/* win-build/migrations
printf "\n Copying Migrations files - Completed\n\n"

cd win-build

printf "\n Packaging - Started"
pkg index.js -t node16-win-x64
printf "\n Packaging - Completed\n\n"

printf "\n Removing unwanted files - Started"
rm *.js
rm *.js.map
rm -r lib
printf "\n Removing unwanted files - Completed\n\n"

