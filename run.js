const fs = require('fs');
const bitcoin = require('bitcoinjs-lib');

const wifRegex = RegExp(/^[5KL][1-9A-HJ-NP-Za-km-z]{51}/, 'gm');

function getPublicKeyFromWIF(wifKey) {
    try {
        const keyPair = bitcoin.ECPair.fromWIF(wifKey);
        return keyPair.publicKey.toString('hex');
    } catch (e) {
        return null;
    }
}

function extractWifKeysFromWalletDump() {
    try {  
        const fileData = fs.readFileSync('wallet', 'utf8');
        const fileText = fileData.toString();
        let wifMatches;
        let wifKeys = [];

        while ((wifMatches = wifRegex.exec(fileText)) !== null) {
            // console.log(`Found ${wifMatches[0]}. Next starts at ${wifRegex.lastIndex}.`);
            wifKeys.push(wifMatches[0]);
        }
        return wifKeys;
    } catch(e) {
        return null;
    }
}

const extractedWifKeys = extractWifKeysFromWalletDump();

// Remove pubkeys file if already exists
try {
    fs.unlinkSync('pubkeys');
    console.log("pubkeys file deleted");
} catch (error) {
    console.log("pubkeys file not deleted");
}

extractedWifKeys.forEach(wifKey => {
    const publicKey = getPublicKeyFromWIF(wifKey)
    fs.appendFileSync('pubkeys', publicKey + "\n", error => {
        if (error) {
          console.error(error)
          return
        }
      })
});
