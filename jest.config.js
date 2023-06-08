/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@application/(.*)$": "<rootDir>/src/application/$1",
        "^@domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@infra/(.*)$": "<rootDir>/src/infra/$1",
        "^@main/(.*)$": "<rootDir>/src/main/$1",
    },
    collectCoverage: true,
    testMatch: ["<rootDir>/src/**/*.test.ts"],
};
