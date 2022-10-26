import { Dictionary } from "lodash";
import React, {useState} from "react";

interface CacheProps {
    children: React.ReactNode;
}

export interface EnsResp {
    address: string | null;
    name: string | null;
    displayName: string | null;
    avatar: string | null;
}

export interface TokenDeets {
    name: string,
    symbol: string,
    decimals: number,
    address: string,
    iconUrl: string,
}

export const cacheContext = React.createContext<any>({});

export const CacheProvider = ({children}: CacheProps) => {

    let [ensCache, setEnsCache] = useState<Dictionary<EnsResp>>({});
    let [queryCache, setQueryCache] = useState<Dictionary<TokenDeets>>({});

    async function getEnsData(addressOrEns: string){
        try {

            if (Object.keys(ensCache).includes(addressOrEns.toLowerCase()) === true){
                // console.log('using cache', addressOrEns) // Enable to see the pref improvements
                return ensCache[addressOrEns];
            }
            else {
                let resp = await fetch(`https://api.ensideas.com/ens/resolve/${addressOrEns.toLowerCase()}`).then(r=>r.json());
                setEnsCache(e=>{
                    let data = e;
                    data[resp?.address.toLowerCase()] = resp;
                    if (resp?.name != null){
                        data[resp?.name.toLowerCase()] = resp;
                    }
                    return data;
                })
                return resp;
            }

        } catch (error) {
            console.log('getEnsData.error', error)
            return false;
        }
    }

    async function addressToEns(address: string){
        let resp = await getEnsData(address);

        if (Boolean(resp?.name) === false){
            return false;
        }
        else {
            return resp.name;
        }
    }

    async function ensToAddress(ensAddress: string){
        let resp = await getEnsData(ensAddress);

        if (Boolean(resp?.address) === false){
            return false;
        }
        else {
            return resp.address;
        }
    }

    async function getTokenDeets(address: string){
        if (Object.keys(queryCache).includes(address.toLowerCase()) === true){
            // console.log('using queryCache', address) // Enable to see the pref improvements
            return queryCache[address.toLowerCase()];
        }
        else {
            let data = await fetch(`https://rpc.omnid.space/tokendeets/${address}`).then(e=>e.json());
            let resp = data as Array<TokenDeets>;
            if (resp.length > 0){
                setQueryCache(e=>{
                    let data = e;
                    data[resp[0].address.toLowerCase()] = resp[0];
                    return data;
                })
                return resp[0];
            }
            else {
                return false;
            }
        }
    }

    return (
        <cacheContext.Provider value={{getEnsData, addressToEns, ensToAddress, getTokenDeets }}>
            {children}
        </cacheContext.Provider>
    )
}
