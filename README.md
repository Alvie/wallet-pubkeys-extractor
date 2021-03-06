# Extract Pubkeys
This small node.js application was created as there was a need for a few of us to get multiple pubkeys at once in order to generate multiple multisig addresses. It can probably be improved quite a bit, but it does the job for now.

## Prerequisites
- Node.js
- Bitcoin Core (or derivatives)

## How to use
From Bitcoin Core (or derivatives):
1. unlock the wallet you intend to dump with `walletpassphrase INSERT_PASSPHRASE 100`,
1. and then dump the wallet with `dumpwallet NAME_OF_WALLET`
1. you will receive the location of the dumped wallet, locate the file and copy it to the same directory that contains run.js.
1. rename the above mentioned file to "wallet" without the quotes, and no file extension. The folder structure should look like this:
    - ```
      wallet-pubkeys-extractor/
        -> package-lock.json
        -> package.json
        -> run.js
        -> wallet
      ```
1. If you wish, you may remove any extra details such as comments at the top, or the scriptPubkeys at the bottom. As long as each private WIF (wallet import format) key (starts with K/L) is at the beginning of that line, the format is okay.
    - ```
      L1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1 2021-10-17T17:52:50Z label=wif1

      L7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2 2021-10-17T17:52:50Z label=wif2

      K9aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3 #no extra stuff

      Kaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa4 2021-10-17T17:52:50Z label=wif4

      keyNotAtBeginning=wontWork Lpaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa5

      L3aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa6 random garbage text
        ```
1. run `npm install` in the terminal / cli to install node packages (make sure you are in the correct directory)
1. run `node run` in the terminal / cli (make sure you are in the correct directory)
1. You will find a new file called pubkeys; this contains the pubkeys for the private WIF keys! The folder structure should look like this:
    - ```
      wallet-pubkeys-extractor/
        -> node_modules/
          -> ... (package files)
        -> package-lock.json
        -> package.json
        -> pubkeys
        -> run.js
        -> wallet
      ```
    Open the pubkeys file in a text editor of your choice to find the public keys