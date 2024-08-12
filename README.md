# Overview
AuraScan(https://aurascan.xyz/) is a blockchain explorer on the Aleo network, enabling queries of on-chain data (blocks, transactions, programs, validators, provers), wallet connections, and program deployments and executions, making it an indispensable data analysis platform for the Aleo ecosystem.

# Key Features of Aurascan
## Provide data applications based on various scenarios

## 

# Front-End
## Install

### Environmental requirements
- required: Node.js(https://nodejs.org/en/)
- optional : Yarn (https://yarnpkg.com/)

### Install Dependencies
```yarn install or npm install ```

### Compiles and hot-reloads for development
```npm start```


### API Environment Configuration

By default, the profiles are in the root directory of the project. You can modify the value of proxy to change the server address.

**Example:**

If you want to change the server address, you can open the file package.json. Then you will see the default value of proxy is "http://127.0.0.1:5210", modify it according to your actual server address. Please notice that you should run "yarn start" or "npm run start" to apply this change.

### Build
```npm run build```