# E-commerce Test Automation with Playwright

## Overview

This project automates key test scenarios for the SauceDemo e-commerce website using Playwright Test and JavaScript.

The purpose of this project is to demonstrate practical skills in web application testing, test automation, and the Page Object Model (POM) design pattern.

## Technologies Used

- JavaScript
- Node.js
- Playwright Test
- Visual Studio Code
- Git and GitHub

## Test Scenarios

### Login

- Verify successful login with valid credentials.
- Verify login failure with invalid credentials.
- Verify validation when login fields are empty.

### Products

- Verify the products page loads correctly.
- Verify the expected number of products is displayed.
- Verify a product can be added to the cart.

### Shopping Cart

- Verify added products appear in the cart.
- Verify the cart badge updates correctly.
- Verify products can be removed from the cart.
- Verify the cart count when multiple products are added.

### Checkout

- Verify checkout information is displayed.
- Verify validation for missing required information.
- Verify a purchase can be completed successfully.

## Project Structure

The project uses the Page Object Model (POM) to separate page interactions from test cases.

- `page/` — Page Object Model classes.
- `tests/` — Automated test cases.
- `playwright.config.js` — Playwright configuration.
- `package.json` — Project dependencies and scripts.
- `.gitignore` — Files excluded from version control.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/kamsiyo730/ecommerce-qa-automation.git
   ```
