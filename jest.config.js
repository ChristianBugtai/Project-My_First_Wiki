module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testMatch: ["**/test/**/*.test.ts"], 
    moduleFileExtensions: ["ts", "js", "json"],
    moduleDirectories: ["node_modules", "src"], 
    roots: ["<rootDir>/src", "<rootDir>/test"], 
    transform: {
      "^.+\\.ts$": "ts-jest", 
    },
  };