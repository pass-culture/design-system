#!/usr/bin/env bash

set -o errexit -o nounset -o pipefail

latest_tag=$(curl -sL "https://api.github.com/repos/pass-culture/design-system/tags" | jq -r '.[0].name')
version=${latest_tag#v}  

# Increment the version
IFS='.' read -r major minor patch <<< "$version"
next_patch=$((patch + 1))
next_tag="v$major.$minor.$next_patch"


git switch --create generate-dist-case
yarn tsc
git add dist/
git commit --message "$next_tag"


read -p "Are you sure? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git tag "$next_tag"
    git push origin "$next_tag"
    git switch -
    git branch -D generate-dist-case
fi