import React from 'react';
import { Regions } from '../gameLogic/Enums/Regions';

export default function RegionBonusInfo() {
    return (
        <div className='region-bonus-info'>
            <h1 className='region-bonus-info--header'>Region Bonuses</h1>
            {Object.keys(Regions).map((keyName, i) => (
                <p className={`region-bonus-info--region ${Regions[keyName].getName()}`} key={i}>{Regions[keyName].getName()} +{Regions[keyName].getBonusUnits()}</p>
            ))}
        </div>
    )
}