import React from "react";
import CustomButton from "./components/common/CustomButton";
import { useHistory } from 'react-router-dom';

export default function Home() {
    const navigate = useHistory();

    return (
        <div id="about-page">
            <h1>Lord of the Risk</h1>
            <p>Welcome to Lord of the Risk! An online version of The Lord of the Rings Risk.</p>
            <CustomButton label="New Game" onClick={() => navigate.push('/new-game')}/>
        </div>

    )
}