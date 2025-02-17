"use client"
import axios from 'axios';
import { useEffect, useState } from "react"
import { ShowcaseSection } from "../Layouts/showcase-section"
import InputGroup from "../FormElements/InputGroup"
import { Button } from "../ui-elements/button"
import { MessageOutlineIcon } from "@/assets/icons"

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setTokenEditable, setTokenState } from '@/app/redux/token'

const TokenPage = () => {

    const stateToken = useAppSelector(state => state.token);
    const dispatch = useAppDispatch();

    const [token, setTokenValue] = useState('');

    useEffect(() => {
        dispatch(setTokenState(TOKEN_TOKEN));
    }, []);

    const TOKEN_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZGY3MmNmNC02ZDc0LTQwZjItODU0My00OTllZGY1MmEyNGQiLCJqdGkiOiI3YWQ0ZTkzZmY1M2JjYzc4MGY2YTc2ZmVmYWUxZWZhOGRlYzY0MGQ0YzBlZWMyOWE1NDQ3NmI0NDhlNmY5NmEzOTNiMWY3ZjI0MzNiZmNhYiIsImlhdCI6MTczOTU1NTA1OS42MTI5NTUsIm5iZiI6MTczOTU1NTA1OS42MTI5NTcsImV4cCI6MTc3MTA5MTA1OS42MDEyMzksInN1YiI6IjExMzkiLCJzY29wZXMiOltdfQ.P3lvI0R-kzVQj2qcfcmrSIjDqhzvVZW7g_SQmU3Gk-eREJYDIoZOKbfrP3cDfRFo1QxQdVIPVl8c3oyGjf2CbTk17o10bl9E7zeAIkb_erBe39ZO_6Kol5a8BQiNvHFZisfsdxU1rRdxiNUBDLqqprQKEtDfuGD-Hh_G4XBUPa9KMAwcM99TXCu2NI8kIE_DIJwG463CCkR6bONbrTr_oDAQu-jsi6bz6sGlWfWgBZmAsmjUP9fpGrrlLADXR_dZf5Koi6E9TkDKDVeI8GjdZnxe0zgu-fNJ5KoHHMtEunitgNMFoi6_jdkbG3johPmEhUGMAP8-qPrKVBjqQVUZp2YWoxa1gZ92aLgl1UiQ_HbgcmXSR8Uves0VAcopfi_dhzc60W97gn4TMEREaYX1F_Tp8UG5FHXrqbTrXbscA_c1bMV8VS8lleLydeWpcpDfXeAd1yCGPYo_WT7FEKNYJyz3a3uUQ9p8lIACEBzhc94G_DKDu4MlspBq9ItoZI2nTEmYYnkbhVd7cji7hkMKCUiLWGOegAKl0DBPhavi22mlP5ob_LFvvfyseD5LxZJv1nJzpIdmRDJoIkLMzMBDq88nM06Ks3OR7ptPNGl0o3030eg-yCpJEen_j1L6kxUGGHSpWLlkovqqzm5WdqkhcHeVymBhaHUlsZBSS0VHccc';

    const setToken = () => {
        axios.post('/api/token/set', {
            token: token
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Token set successfully:', response.data);
            dispatch(setTokenState(token));
        })
        .catch(error => {
            console.error('Error setting token:', error);
        });
    }

    const editToken = (str: string) => {
        setTokenValue(str);
        if(!stateToken.isEdit){
            dispatch(setTokenEditable())
        }
        
    }

    const updateToken = () => {
        setTokenValue(token);
        dispatch(setTokenEditable())
    }

    return (
        <>
            <ShowcaseSection title="TOKEN INPUT PAGE" className="space-y-5.5 !p-6.5">
                <InputGroup
                    label="Token Input"
                    placeholder="Token"
                    type="text"
                    value={TOKEN_TOKEN}
                    handleChange={ e => editToken(e.target.value)}
                />
                {
                    !stateToken.isEdit ? 
                        <Button
                            label="Add Token"
                            variant="outlineGreen"
                            shape="full"
                            size="small"
                            onClick={() => setToken()}
                        />
                    :
                    <Button
                        label="Update Token"
                        variant="green"
                        shape="full"
                        size="small"
                        icon={<MessageOutlineIcon />}
                        onClick={() => updateToken()}
                    />

                }
            </ShowcaseSection>
        </>
    )
}

export default TokenPage;
