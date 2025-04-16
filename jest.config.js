module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|@react-navigation)/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
};
