import { Region } from '../Models/Region';
import { Areas } from '../Enums/Areas';

const eriadorAreas = [Areas.Forlindon, Areas.Mithlond, Areas.Harlindon, Areas.TowerHills, Areas.EvendimHills, Areas.LuneValley, Areas.TheShire];
const arnorAreas = [Areas.Forodwaith, Areas.Angmar, Areas.EasternAngmar, Areas.Borderlands, Areas.NorthDowns, Areas.Rhudaur, Areas.Fornost, Areas.WeatherHills, Areas.Buckland, Areas.OldForest, Areas.SouthDowns];
const rhunAreas = [Areas.NorthRhun, Areas.WitheredHeath, Areas.Esgaroth, Areas.SouthRhun];
const mirkwoodAreas = [Areas.Carrock, Areas.NorthMirkwood, Areas.AnduinValley, Areas.EasternMirkwood, Areas.SouthMirkwood];
const rohanAreas = [Areas.Eregion, Areas.Minhiriath, Areas.Dunland, Areas.Enedwaith, Areas.Fangorn, Areas.WestRohan, Areas.GapOfRohan];
const rhovanionAreas = [Areas.Moria, Areas.GladdenFields, Areas.Lorien, Areas.EmynMuil, Areas.BrownLands, Areas.RhunHills, Areas.TheWold, Areas.DeadMarshes];
const gondorAreas = [Areas.DruwaithIaur, Areas.Andrast, Areas.Anfalas, Areas.ValeOfErech, Areas.Lamedon, Areas.Belfalas, Areas.Lebennin, Areas.MinasTirith, Areas.Ithilien, Areas.SouthIthilien];
const mordorAreas = [Areas.UdunVale, Areas.MountDoom, Areas.BaradDur, Areas.MinasMorgul, Areas.Gorgoroth, Areas.Nurn];
const haradwaithAreas = [Areas.Harondor, Areas.Umbar, Areas.DeepHarad, Areas.Harad, Areas.NearHarad, Areas.Khand];

interface ListOfRegions { 
    [key: string]: Region
}

export const Regions: ListOfRegions = {
    Eriador: new Region('eriador', eriadorAreas, 3),
    Arnor: new Region('arnor', arnorAreas, 7),
    Rhun: new Region('rhun', rhunAreas, 2),
    Mirkwood: new Region('mirkwood', mirkwoodAreas, 4),
    Rohan: new Region('rohan', rohanAreas, 4),
    Rohvanion: new Region('rhovanion', rhovanionAreas, 4),
    Gondor: new Region('gondor', gondorAreas, 7),
    Mordor: new Region('mordor', mordorAreas, 2),
    Harawaith: new Region('haradwaith', haradwaithAreas, 2),
}