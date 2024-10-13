import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {ListProject} from "../components/ListProject";
import {Menu} from "../components/Menu";
import {Footer} from "../components/Footer";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    const [api, setAPI] = useState([])

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

  return (
    <>

      <main className={styles.main} style={{fontFamily:"Arimo", backgroundImage: "linear-gradient(180deg,#0c111c,#0f1421 14.87%,#10131a 29.77%,#19191b 50%)"}}>

          <Menu/>
          <div style={{fontSize:"50px", padding:"35px",  fontFamily:"Arimo", fontWeight:"bold", color:"rgb(50, 224, 141)",marginTop:"20px", textAlign:"center"}}>
              NULS ORACLES
          </div>


          <div style={{backgroundColor:"white", padding:"10px", borderRadius:"10px", width:"80%", marginTop:"30px"}}>

              <div className={styles.listProject} style={{fontWeight:"bold"}}>
                  <div>
                      Oracle
                  </div>
                  <div className={styles.vFeeder}>
                      Valid Feeders
                  </div>
                  <div className={styles.vFeeder}>
                      Reads Number
                  </div>
                  <div>
                      STATUS
                  </div>
              </div>
              <div>
                  {
                      (api.length > 0 ) ? api.map((oracle:any) =>
                              <ListProject key={oracle.id} coin={oracle}/>
                          )
                          :
                          <>No Projects Listed!</>
                  }
              </div>

          </div>


        <Footer/>
      </main>
    </>
  )
}
