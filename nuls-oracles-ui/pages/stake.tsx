import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import BigNumber from "bignumber.js";
import {ListProject} from "../components/ListProject";
import {Menu} from "../components/Menu";
import {Footer} from "../components/Footer";
import NaboxWindow from "../types/NaboxWindow";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    const [api, setAPI] = useState([])
    const [account, setAccount] = useState("")
    const [balanceORA, setBalanceORA] = useState("0.00")
    const [depositedORA, setDepositedORA] = useState("0.00")
    const [earned, setEarned] = useState("0.00")
    const [allTimeEarned, setAllTimeEarned] = useState("0.00")
    const [value, setValue] = useState("0")

    useEffect(() => {

        async function getProjects(){
            try{
                const response = await fetch("/oracles.json", {
                    method: "GET",
                }).then( (res) => res.json()).then((data) => setAPI(data))
            }catch (error){
                console.log(error)
            }
        }
        getProjects()
    }, [])

    useEffect(() =>{

        async function getTokenBalance() {

            const naboxInfo:any = await (window as unknown as NaboxWindow).nabox.createSession();
            console.log(naboxInfo)
            const address = naboxInfo[0];
            setAccount(address)



        }
        getTokenBalance()


        async function getProjectRaisePer() {

            const data = {
                contractAddress: "NULSd6HgtLD3DMYU5gcx87mHT5v8iTzA8ADbE",
                methodName: "balanceOf",
                methodDesc: "(Address owner) return BigInteger",
                args: [account?.toString()],
            };
            const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
            console.log(res.result)
            setBalanceORA(res.result)
            return res.result;
        }

        getProjectRaisePer()

        async function getDepositedORA() {

            const data = {
                contractAddress: "NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",
                methodName: "_balanceOf",
                methodDesc: "(Address account) return BigInteger",
                args: [account?.toString()],
            };
            const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
            console.log(res.result)
            setDepositedORA(res.result)
            return res.result;
        }

        getDepositedORA()

        async function getRewards() {

            const data = {
                contractAddress: "NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",
                methodName: "earned",
                methodDesc: "(Address account) return BigInteger",
                args: [account?.toString()],
            };
            const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
            console.log(res.result)
            setEarned(res.result)
            return res.result;
        }

        getRewards()


        async function getAllTimeRewards() {

            const data = {
                contractAddress: "NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",
                methodName: "allTimeEarned",
                methodDesc: "(Address account) return BigInteger",
                args: [account.toString()],
            };
            const res = await (window as unknown as NaboxWindow).nabox.invokeView(data);
            console.log(res.result)
            setAllTimeEarned(res.result)
            return res.result;
        }

        getAllTimeRewards()
    },[account])

    async function approve(
    ) {
        const data = {
            from: account,
            value: 0,
            contractAddress: "NULSd6HgtLD3DMYU5gcx87mHT5v8iTzA8ADbE",
            methodName: "approve",
            methodDesc:
                "(Address spender, BigInteger value) return boolean",
            args: ["NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",  new BigNumber(value).multipliedBy(Math.pow(10, 8)).toString()],
        };
        const res = await (window as unknown as NaboxWindow).nabox.contractCall(data);
        return res?.toString();
    }

    async function deposit(
    ) {
        const data = {
            from: account,
            value: 0.01,
            contractAddress: "NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",
            methodName: "stake",
            methodDesc:
                "(BigInteger amount) return void",
            args: [ new BigNumber(value).multipliedBy(Math.pow(10, 8)).toString()],
        };
        const res = await (window as unknown as NaboxWindow).nabox.contractCall(data);
        return res?.toString();
    }

    async function claim(
    ) {
        const data = {
            from: account,
            value: 0.01,
            contractAddress: "NULSd6HgpAD6EY9RwsrFbnHSPRPATj5bfEyfq",
            methodName: "getReward",
            methodDesc:
                "() return BigInteger",
            args: [],
        };
        const res = await (window as unknown as NaboxWindow).nabox.contractCall(data);
        return res?.toString();
    }


    return (
        <>
            <main className={styles.main} style={{fontFamily:"Arimo", backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)"}}>

                <Menu/>


                <div style={{backgroundColor:"white", minWidth:"300px", fontFamily:"Arimo", padding:"10px", borderRadius:"10px", width:"35%", marginTop:"90px"}}>
                    <div style={{textAlign:"center", fontWeight:"bold",padding:"15px", fontSize:"18px"}}>
                        Claim Your Dividends
                    </div>
                   <div>
                       <div  style={{textAlign:"center", padding:"8px 2px", backgroundColor:"lightgrey"}}>
                           {account?.toString()}
                       </div>

                   </div>
                    <div style={{padding:"5px"}}>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"8px"}}>
                            <div>
                                Your ORA Holdings
                            </div>
                            <div>
                                { new BigNumber(balanceORA).dividedBy(Math.pow(10, 8)).toString()} ORA
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"8px"}}>
                            <div>
                                Your ORA Staked
                            </div>
                            <div>
                                { new BigNumber(depositedORA).dividedBy(Math.pow(10, 8)).toString()} ORA
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"8px"}}>
                            <div>
                                Unclaimed Earnings
                            </div>
                            <div>
                                { new BigNumber(earned).dividedBy(Math.pow(10, 8)).toString()}  NULS
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", padding:"8px"}}>
                            <div>
                                All Time Earnings
                            </div>
                            <div>
                                { new BigNumber(allTimeEarned).dividedBy(Math.pow(10, 8)).toString()} NULS
                            </div>
                        </div>

                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <input style={{
                                padding:"10px",
                                borderRadius:"4px",
                                backgroundColor:"transparent",
                                border:"1px solid grey",
                                color:"black",
                                cursor:"pointer",
                                width:"80%",
                                fontWeight:"bold",
                                marginTop:"10px"
                            }} onChange={(e) => setValue(e.target.value)}/>
                            <button
                                style={{
                                    padding:"10px",
                                    borderRadius:"4px",
                                    backgroundColor:"rgb(50, 224, 141)",
                                    border:"0px solid",
                                    color:"white",
                                    cursor:"pointer",
                                    width:"80%",
                                    fontWeight:"bold",
                                    marginTop:"10px"
                                }} onClick={() => approve()}
                            >Approve ORA Tokens</button>
                            <button
                                style={{
                                    padding:"10px",
                                    borderRadius:"4px",
                                    backgroundColor:"rgb(50, 224, 141)",
                                    border:"0px solid",
                                    color:"white",
                                    cursor:"pointer",
                                    width:"80%",
                                    fontWeight:"bold",
                                    marginTop:"10px"
                                }} onClick={() => deposit()}
                            >Stake</button>
                            <button
                            style={{
                                padding:"10px",
                                borderRadius:"4px",
                                backgroundColor:"rgb(50, 224, 141)",
                                border:"0px solid",
                                color:"white",
                                cursor:"pointer",
                                width:"80%",
                                fontWeight:"bold",
                                marginTop:"10px"
                            }}
                            onClick={() => claim()}
                            >Claim</button>
                        </div>
                        <div style={{color:"red", marginTop:"20px", padding:"10px"}}>
                            Attention: By depositing your ORA tokens you are burning them.
                            This means you will receive a % of the revenue of the project,
                            but you will never be able to retrieve the ORA tokens back.

                        </div>
                    </div>

                </div>


               <Footer/>
            </main>
        </>
    )
}
