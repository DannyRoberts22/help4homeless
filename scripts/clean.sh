#!/bin/bash

declare -a summary

function check_status() {
  if [ $? -eq 0 ]; then
    summary+=("✅ - $1")
  else
    summary+=("❌ - $1")
  fi
}

# Clean Android build
cd android && ./gradlew clean && cd ..
check_status "gradlew clean"

# Remove node_modules
rm -rf node_modules
check_status "node_modules deleted"

# Remove Android build folder
rm -rf android/app/build/
check_status "android build folder deleted"

# Remove iOS build folder
rm -rf ios/build/
check_status "iOS build folder deleted"

# Remove iOS Pods
rm -rf ios/Pods
check_status "iOS Pods deleted"

# Clean Pod cache
cd ios && pod cache clean --all && pod deintegrate && cd ..
check_status "iOS Pods Cache deleted"

# Clean Watchman Cache
watchman watch-del-all
check_status "Watchman cache cleared"

# Clean Metro Bundler Cache
rm -rf $TMPDIR/metro-*
check_status "Metro bundler cache cleared"

# Clean Yarn cache
yarn cache clean
check_status "Yarn cache cleared"

# Install dependencies
yarn install
check_status "Dependencies installed"

# Install iOS Pods
cd ios && pod install && cd ..
check_status "Pod install done"

# Clean Xcode Derived Data
rm -rf ~/Library/Developer/Xcode/DerivedData
check_status "Xcode Derived Data cleaned"

# Reset React Native cache
rm -rf $TMPDIR/react-native-packager-cache-*
rm -rf $TMPDIR/haste-map-react-native-packager-*
check_status "React Native packager cache cleared"

# Final Success Message
echo -e "\033[32mCLEANING PROCESS COMPLETED\033[0m"

# Print Summary
echo -e "\n\033[1mSummary:\033[0m"
for status in "${summary[@]}"; do
  echo -e "$status"
done
