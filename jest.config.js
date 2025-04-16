module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
};
