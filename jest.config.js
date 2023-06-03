/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverage: true,
    testMatch: ["<rootDir>/src/**/*.test.ts"]
};
