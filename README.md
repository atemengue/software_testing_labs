# README

Welcome to the **JavaScript Unit Testing with Vitest** project! This README provides detailed instructions on how to set up, run, and contribute to the project. It also includes information on the project's structure and the technologies used. The project is designed to test the mobile application of a local restaurant.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Tests](#running-tests)
5. [Project Structure](#project-structure)
6. [Writing Tests](#writing-tests)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

## Introduction

This project demonstrates how to perform unit testing in JavaScript using Vitest, a fast unit test framework compatible with Vite. The goal is to ensure the reliability and correctness of individual units of code by isolating and testing them thoroughly.

## Features

- **Fast Unit Testing**: Leverages Vitest for quick and efficient unit tests.
- **Mocking and Stubbing**: Supports isolation of code units using mocking and stubbing techniques.
- **Automated Tests**: Integrates with continuous integration pipelines for automated test execution.
- **Comprehensive Coverage**: Aims for high test coverage to ensure code reliability.

## Technologies Used

- **JavaScript**: The programming language used for the application and tests.
- **Node.js**: Runtime environment for executing JavaScript code.
- **Vitest**: Unit testing framework for JavaScript.
- **Vite**: Build tool that provides fast and lean development experiences.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Vscode** (version 1.90.0)
- **Node.js** (version  20.12.2)
- **Vitest** (version 1.6.0)
- **Vite** (version 5.0.x)
- **npm** (Node Package Manager)

### Installation

Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/atemengue/software_testing_labs
cd software_testing_labs
npm install
npm init
npm install vitest --save-dev
```
### Running Tests

To run the tests using Vitest, execute the following command:
npm run test
```bash
npx vitest run
npx vitest --help
```
## Project Structure

The project follows a structured directory layout:
TP1_GROUPE6_INFO_352/
├── coverage/
├── Expose_INF352-groupe6/
├── js/
│   ├── basket/
│   ├── error-handling/
│   │   ├── exceptions.js
│   ├── events/
│   ├── promotions/
│   ├── users/
│   │   ├── account/
│   │   │   ├── purchaseHistory/
│   │   │   │   ├── __mocks__/
│   │   │   │   ├── purchaseHistory.js
│   │   │   ├── account.js
│   │   ├── users.js
├── node_modules/
├── Test/
│   ├── Basket/
│   │   ├── basket.test.js
│   ├── Error-handling/
│   ├── Events/
│   ├── Promotions/
│   ├── Users/
│   │   ├── account/
│   │   │   ├── purchaseHistory/
│   │   │   │   ├── purchaseHistory.test.js
│   │   │   ├── account.test.js
│   │   ├── users.test.js
├── package-lock.json
├── package.json
├── SOFTWARE_UNIT_TESTING_PLAN.pdf

## Contributors
- NTABET SALOMON PIERRE, Matricule 21T2582(Group leader) 
- LIOMO SIMEU NAOMI, Matricule 21T2268 
- TIAGOU AZAMBOU YOLLANDE, Matricule 21T2523

## Contributing

We welcome contributions to the project! To contribute, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bugfix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your forked repository.
5.  Create a pull request to the main repository.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the GNU General Public License (GPL). See the  LICENSE  file for details.

## Acknowledgements

-   [Vitest](https://vitest.dev/)  for providing a fast and efficient testing framework.
-   [Vite](https://vitejs.dev/)  for a great development experience.
-  Kimbi Xaveria, PhD university of Yaounde I, course lecturer.
- Regis Atemengue, course instructor. 
-   All group members who have contributed to this unit testing project.

Thank you for using our project! We hope it helps you ensure the reliability and correctness of your JavaScript test.








