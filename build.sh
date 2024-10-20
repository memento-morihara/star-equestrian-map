#!/bin/bash

# Delete admin route before building
# source: https://pyronaur.com/sveltekit-admin

echo_green() {
    echo -e "\033[1;32m> $1\033[0m"
}

echo_green "Building site..."
mkdir tmp

echo_green "Moving admin routes to tmp..."
mv ./src/routes/admin ./tmp/admin

echo_green "Building site..."
vite build

echo_green "Moving admin routes back..."
mv ./tmp/admin ./src/routes/admin

echo_green "Removing tmp..."
rm -rf tmp

echo_green "🎉 Static site without admin built successfully!"