// require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          // '@env': './node_modules/react-native-dotenv',
        },
      },
    ],
    // [
    //   'module:react-native-dotenv',
    //   {
    //     envName: 'APP_ENV',
    //     moduleName: '@env',
    //     path: '.env',
    //     blocklist: null,
    //     allowlist: null,
    //     safe: false,
    //     allowUndefined: true,
    //     verbose: false,
    //   },
    // ],
  ],
};
