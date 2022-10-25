
# Solana Launchpad

A free Solana Launchpad Fully customizable

![alt text](https://i.ibb.co/S5vBXWL/website.png)

![alt text](https://i.ibb.co/8NrD1KD/website2.png)


## Steps

 - Create a Treasury Wallet
 - Create the SPL Token
 - Create and set the whitelist on the gumdrop
 - Create the gumdrop machine
 - Create the NFT Assets
 - Create the CandyMachine and upload the assets

## Documentation


# 1 Create a Treasury Wallet
```shell
  solana config set --url $URL    
```
```shell
  solana-keygen new --outfile ~/.config/solana/devnet.json
```
```shell
  solana config set --keypair $KEYPAIR_Path    
```
Airdrop 2 Solana on the account
```shell
  solana airdrop 2
```
If you missed your publick key you can run
```shell
  solana-keygen pubkey
```

# 2 Create the SPL Token

```shell
  spl-token create-token --decimals 0
```
Save somewhere your new token


```shell
  export SPL_TOKEN="<YOUR NEW TOKEN JUST CREATED>"
```

Mint the token newly created 
```shell
  spl-token create-account $SPL_TOKEN"
```
```shell
  spl-token mint $SPL_TOKEN token_supply
```
Disable mint when mint is done
```shell
  spl-token authorize $SPL_TOKEN mint --disable
```

# 3 Create and set the whitelist on the gumdrop


Create whitelist.json file
```json
[
  {
    "handle": "<USER WALLET>",
    "amount": 1
  }
]
```

# 4 Create the gumdrop machine
Run this command on your shell and replace with your data
```shell
ts-node C:\Users\kraus\metaplex\js\packages\cli\src\gumdrop-cli.ts create 
--env $network --keypair $KEYPAIR --rpc-url $RPC --claim-integration 
"transfer" --transfer-mint $SPL_TOKEN --distribution-method "wallets" 
--otp-auth "disable" --distribution-list $WHITELIST
```

# 5 Create assets
## NFT Assets

Create the directory assets in the root folder

Import each Json and image replace with all your data and your treasury wallet address

```json
{
  "name": "MagiiK #0",
  "symbol": "MK",
	"description": "",
  "image": "0.png",
  "properties": {
    "files": [
      {
        "uri": "0.png",
        "type": "image/png"
      }
    ],
    "creators": [
      {
        "address": "ArJP9SxRQgH4B2zdomn5pB6ZDUrP96YjJsD1wkU2xdbb",
        "share": 100
      }
    ]
  },
  "attributes": [
    {
      "trait_type": "face",
      "value": "face2"
    },
    {
      "trait_type": "mouth",
      "value": "m2"
    },
    {
      "trait_type": "ears",
      "value": "ears3"
    },
    {
      "trait_type": "eyes",
      "value": "eyes1"
    },
    {
      "trait_type": "hair",
      "value": "hair3"
    },
    {
      "trait_type": "mouth",
      "value": "m3"
    },
    {
      "trait_type": "nose",
      "value": "n1"
    },
    {
      "trait_type": "access",
      "value": "acc2"
    }
  ]
}
```

## Create config.json
```json
{
  "price": 0.5,
  "number": 10,
  "gatekeeper": null,
  "solTreasuryAccount": "<YOUR WALLET ADDRESS>",
  "splTokenAccount": null,
  "splToken": null,
  "goLiveDate": "30 Jan 2022 00:00:00 UTC",
  "endSettings": null,
  "whitelistMintSettings": {
    "mode": {
      "burnEveryTime": true
    },
    "mint": "<SPL TOKEN>",
    "presale": true,
    "discountPrice": 0.33
  },
  "hiddenSettings": null,
  "storage": "arweave",
  "ipfsInfuraProjectId": null,
  "ipfsInfuraSecret": null,
  "awsS3Bucket": null,
  "noRetainAuthority": false,
  "noMutable": false
}
```
# 6 Create the CandyMachine and upload the assets
## CandyMachine

- Go in the root folder
- Generate new keypair `solana-keygen new --outfile ~/.config/solana/devnet.json`
- Set new keypair as default `solana config set --keypair ~/.config/solana/devnet.json`
- Add treasury on the candyMachine `solana airdrop 2`

## Upload assets in the Candy Machine

- Upload nft `ts-node C:/Users/kraus/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -cp config.json ./assets` DONT FORGET TO CHANGE TO THE RIGHT RPC
- Check if the collection was well uploaded `ts-node C:/Users/kraus/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json`
- If it need a redeploy do : `ts-node C:/Users/kraus/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts update_candy_machine -e devnet -k ~/.config/solana/devnet.json -cp config.json`




