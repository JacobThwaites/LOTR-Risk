import React from "react";
import CustomButton from "./components/common/CustomButton";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div id="about-page">
            <h1 id="about-page--header">Lord of the Risk</h1>
            <div id="about-page--body">
                <p id="about-page--description">Welcome to Lord of the Risk! An online version of The Lord of the Rings Risk.</p>
                <p id="about-page--description">You can create a new game by clicking the link below!</p>
                <CustomButton label="New Game" onClick={() => navigate('/new-game')}/>
            </div>
        </div>
    )
}