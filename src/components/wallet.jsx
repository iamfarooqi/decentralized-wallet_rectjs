import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
const Wallet = () => {
    const [Wallet, setWallet] = useState();
    const [Address, setAddress] = useState();
    const [SelWallet, setSelWallet] = useState();
    const [PrivateKey, setPrivateKey] = useState();
    const [Amount, setAmount] = useState();
    console.log(PrivateKey, "SelectedAddress");

    const createAccount = async () => {
        try {
            const web3 = new Web3()
            let newAccount = web3.eth.accounts.create();
            console.log(newAccount, "newAccount");
            newAccount = web3.eth.accounts.encrypt(newAccount.privateKey, 'password');
            newAccount = JSON.stringify(newAccount)
            localStorage.setItem('Account', newAccount)

        } catch (error) {
            console.log(error);
        }
    }
    const getAccount = () => {
        try {
            const web3 = new Web3()
            let Account = localStorage.getItem('Account')
            Account = web3.eth.accounts.decrypt(Account, 'password');
        } catch (error) {
            console.log(error);
        }
    }

    const createWallet = async () => {
        let nA = prompt("Add number of Account you want to create")
        let Password = prompt("Create Password")
        try {
            const web3 = new Web3()
            let newWallet = web3.eth.accounts.wallet.create(nA);
            web3.eth.accounts.wallet.save(Password);
        } catch (error) {
            console.log(error);
        }
    }
    const getWallet = async () => {
        let Password = prompt("Enter Password")
        let Wallets = []
        try {
            const web3 = new Web3('https://matic-mumbai.chainstacklabs.com')
            let Wallet = web3.eth.accounts.wallet.load(Password)
            console.log(Wallet, "Wallet");
            for (let i = 0; i < Wallet.length; i++) {
                const element = Wallet[i];
                Wallets.push(element)
            }
            setWallet(Wallets)
        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async (event) => {
        event.preventDefault()

        setSelWallet('');
        setAmount('');



        console.log(Address, "Address");
        const web3 = new Web3('https://matic-mumbai.chainstacklabs.com')
        let ac1 = '0x3AcF8B9d90916E06F8382ce07c9fd2F16F31Ab20'
        let ac2 = '0x6b234F7e9188EA274A88415F46C30EdEc7F6669A'

        let pk1 = 'dd193f40ee517ad66b91bd6d4f1756c44b9388dfe2f94a2f042926165a299a6e'
        // const pk2 = Buffer.from('2f908a82695ee35c13725a029a56a6dbed5d6512315b3f02a2b9d0be7b193344', 'hex')
        try {

            const createTransaction = await web3.eth.accounts.signTransaction(
                {
                    from: Address,
                    to: SelWallet,
                    value: web3.utils.toWei(Amount, 'ether'),
                    gas: '21000',
                },
                pk1
            );
            const createReceipt = await web3.eth.sendSignedTransaction(
                createTransaction.rawTransaction
            );
            console.log(
                `Transaction successful with hash: ${createReceipt.transactionHash}`
            );

        } catch (error) {
            console.log(error);
        }
    }

    const addAccount = () => {
        const account = prompt('add account')
        try {
            const web3 = new Web3()
            const tt = web3.eth.accounts.wallet.add(account);
            console.log(tt, "tt");
        } catch (error) {
            console.log(error);
        }
    }
    // const selectAccount = () => {
    //     const web3 = new Web3()

    //     try {
    //         let Wallet = localStorage.getItem('Wallet')
    //         Wallet = JSON.parse(Wallet)
    //         Wallet = web3.eth.accounts.wallet.decrypt(Wallet);
    //         for (let i = 0; i < Wallet.length; i++) {
    //             const element = Wallet[i];
    //             if (element.Wallet[i].address === Address) {
    //                 // const sell = element.Wallet[i].address === Address
    //                 console.log("hello", element);
    //                 // setPrivateKey(element.Wallet[i].privateKey)
    //             }

    //             // console.log(element.privateKey, "element");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        getWallet()
        // selectAccount()
    }, [Address]);

    return (
        <div>

            <button onClick={createAccount}>Create Account</button>
            <button onClick={getAccount}>get Wallet</button>
            <hr />
            <button onClick={createWallet}>Create Wallet</button>
            <button onClick={getWallet}>get Wallet</button>
            <button onClick={addAccount}>Add account to Wallet</button>
            <button onClick={sendTransaction}>Send</button>
            <hr />

            <span>
                <select onChange={(e) => setAddress(e.target.value)}>
                    <h1>Wallet</h1>
                    {Wallet?.map((data, index) => {
                        return <option value={data.address} >{index + 1} : {data.address}</option>
                        {/* <p>Account {index + 1} : {data.address}</p> */ }
                    })}
                </select>
            </span>
            <form onSubmit={sendTransaction}>
                <label htmlFor="">Wallet Address</label><br />
                <input type="text" onChange={event => setSelWallet(event.target.value)}
                    value={SelWallet} /><br />

                <label htmlFor="">Enter Amount in Ether</label> <br />
                <input type="text" onChange={event => setAmount(event.target.value)}
                    value={Amount} />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default Wallet;
