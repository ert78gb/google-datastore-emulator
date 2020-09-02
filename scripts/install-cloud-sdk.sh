curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
echo "deb https://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
apt-get update && sudo apt-get install google-cloud-sdk google-cloud-sdk-datastore-emulator
