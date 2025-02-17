"use client"
import { ShowcaseSection } from "../Layouts/showcase-section"
import InputGroup from "../FormElements/InputGroup"
import { Button } from "../ui-elements/button"
import { MessageOutlineIcon } from "@/assets/icons"
import { useEffect, useState } from "react"
import axios from 'axios';
// import { getToken } from '';

const TokenPage = () => {

    const [token, setTokenValue] = useState('');

    useEffect(() => {

    }, []);


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
        })
        .catch(error => {
            console.error('Error setting token:', error);
        });
    }

    return (
        <>
            <ShowcaseSection title="TOKEN INPUT PAGE" className="space-y-5.5 !p-6.5">
                <InputGroup
                    label="Token Input"
                    placeholder="Token"
                    type="text"
                    handleChange={ e => setTokenValue(e.target.value)}
                />

                <Button
                    label="Add Token"
                    variant="outlineGreen"
                    shape="full"
                    size="small"
                    onClick={() => setToken()}
                />

                <Button
                    label="Edit Token"
                    variant="green"
                    shape="full"
                    size="small"
                    icon={<MessageOutlineIcon />}
                />
            </ShowcaseSection>
        </>
    )
}

export default TokenPage;
