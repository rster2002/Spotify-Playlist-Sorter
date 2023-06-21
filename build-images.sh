read -rp 'Image tag: ' VERSION

echo Building tag: "$VERSION"

npm run build

docker buildx inspect default &> /dev/null

if [[ $? -ne 0 ]]
then
  echo no default
fi

docker buildx build --push -t docker.jumpdrive.dev/playlist-sorter:"$VERSION" --platform linux/amd64,linux/arm64 .
