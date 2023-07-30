import React from 'react';

export default function RegionBonusInfo() {
    return (
        <div className='region-bonus-info'>
            <h1 className='region-bonus-info--header'>Region Bonuses</h1>
            {regions.map((region, i) => (
                <p className={`region-bonus-info--region ${region.name}`} key={i}>{region.name} +{region.bonusUnits}</p>
            ))}
        </div>
    )
}

const regions = [
    { name: 'eriador', bonusUnits: 3 },
    { name: 'arnor', bonusUnits: 7 },
    { name: 'rhun', bonusUnits: 2 },
    { name: 'mirkwood', bonusUnits: 4 },
    { name: 'rohan', bonusUnits: 4 },
    { name: 'rhovanion', bonusUnits: 4 },
    { name: 'gondor', bonusUnits: 7 },
    { name: 'mordor', bonusUnits: 2 },
    { name: 'haradwaith', bonusUnits: 2 },
]