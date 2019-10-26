let vaultContents;
let vaultPassword;

// function for getting the HTML for the block of a given account object
const getHTMLOfAccountBlock = (accountID) => {
    // account obj
    const accountObj = vaultContents.accounts[accountID];

    // return HTML
    return `
    <div class="account" id="accountid_${accountID}">
        <div class="buttons">
            <button class="remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            </button>
            <button class="edit">
                <svg class="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>
                <svg class="done_editing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            </button>
        </div>
        <h1 class="account_name">${accountObj.name}</h1>
        <ul class="account_properties">
            ${ accountObj.properties.map( (property) => "<li><p class='name'>" + property.name + "</p><p class='value'>" + property.value + "</p></li>" ).join("") }
        </ul>
    </div>
    `;
};

// function for refreshing a given account block
const refreshAccountBlock = (accountID) => {
    // variable for account HTML element
    const accountElement = document.querySelector("body > div.container > div.app > ul.accounts > div.account#accountid_" + accountID);

    // refresh HTML of account element
    accountElement.innerHTML = getHTMLOfAccountBlock(accountID);
}

// function for adding a given account block
const addAccountBlock = (accountID) => {
    // variable for accounts list HTML element
    const accountsListElement = document.querySelector("body > div.container > div.app > ul.accounts");

    // add HTML of account block to accounts list element HTML
    accountsListElement.innerHTML = getHTMLOfAccountBlock(accountID) + accountsListElement.innerHTML;
};

// function for refreshing vault database
const refreshVaultDatabase = () => {
    // refresh database
    encryptJSONToFile("vault/data.txt", vaultPassword, vaultContents);
};

// function when app is opened
const openAppScreen = (passedVaultPassword) => {
    // display app screen and hide auth screen
    document.querySelector("body > div.container > div.auth").style.display = "none";
    document.querySelector("body > div.container > div.app").style.display = "block";

    // put vault password into global variable
    vaultPassword = passedVaultPassword;

    // get vault contents and put in variable
    vaultContents = decryptJSONInFile("vault/data.txt", vaultPassword);

    // loop through each account and display
    vaultContents.accounts.forEach((account, accountID) => {
        // add current account block
        addAccountBlock(accountID);
    });
};

// add account button functionality
document.querySelector("body > div.container > div.app > nav:first-child > div.row:nth-child(2) > button.add_account").addEventListener("click", () => {
    // when button is clicked, add pseudo-empty account, and refresh app
    vaultContents.accounts.push({
        name: "Account Name",
        properties: [
            { name: "Username", value: "" },
            { name: "Password", value: "" }
        ] 
    });

    addAccountBlock(vaultContents.accounts.length - 1);

    refreshVaultDatabase();
});

openAppScreen("test");