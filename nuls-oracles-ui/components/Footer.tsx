import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import NaboxWindow from "../types/NaboxWindow";
import styles from "../styles/Home.module.css";
import {IoIosArrowDropdownCircle} from "react-icons/io";
//import styles from '../../styles/Creator/MyPage/MyPage.module.css'
import Link from "next/link";
//import { ConnectButton } from '@rainbow-me/rainbowkit';
//import Link from "next/link";
//import {useAccount} from "wagmi";
/*import {
    Button,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";*/
//import { FaHouse } from "react-icons/fa6";
//import {GoHome, GoSearch} from "react-icons/go";

//import { FaAngleDown } from "react-icons/fa";
/*


*/
export const Footer = ({}) => {

    const [balanceNuls, setBalanceNuls] = useState()

    const ip1 = "https://api.nuls.io/";


    const [showModal, setShowModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [projectId, setProjectId] = useState(0);

    useEffect(() =>{
        /*
                async function getTokenBalance() {

                    const naboxInfo = await (window as unknown as NaboxWindow).nabox.createSession();
                    console.log(naboxInfo)
                    const address = naboxInfo[0];
                    return new Promise((resolve, reject) => {
                        BigNumber.config({ DECIMAL_PLACES: 8 });

                        axios
                            .post(
                                ip1 + "api/accountledger/balance/" + address,
                                {
                                    assetChainId: 1,
                                    assetId: 1,
                                },
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            )
                            .then(function (response) {
                                var data = response.data;
                                let amountBal = data.data.available;
                                /* var displayBal = new BigNumber(amountBal)
                                     .dividedBy(Math.pow(10, 8))
                                     .toString();
                                setBalanceNuls(amountBal)

                            })
                            .catch(function (error) {});

                    });
                }
                getTokenBalance()*/
    },[])




    return(
        <>
            <div style={{position:"fixed",
                width:"100%",
                height:"50px",
                backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)",
                textAlign:"center", bottom:"0px", left:"0px", color:"white",
                display:"flex",
                alignItems:"center", justifyContent:"space-between",
            }}>
               <div style={{padding:"5px 15px"}}>
                   Developed by NEII
               </div>
                <div>
                    <div style={{padding:"5px 15px"}}>
                        <Link href="https://t.me/+UH3RsicBtN83ZDI8" target="_blank">Telegram</Link>
                    </div>
                </div>
            </div>
        </>
    )
}