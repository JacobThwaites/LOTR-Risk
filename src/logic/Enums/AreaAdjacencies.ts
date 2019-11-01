import { AreaName } from './AreaNames';

const forlindon = [AreaName.Mithlond];
const mithlond = [AreaName.Forlindon, AreaName.LuneValley, AreaName.Harlindon, AreaName.TowerHills];
const luneValley = [AreaName.Mithlond, AreaName.EvendimHills, AreaName.TowerHills];
const evendimHills = [AreaName.LuneValley, AreaName.TowerHills, AreaName.Borderlands, AreaName.NorthDowns];
const towerHills = [AreaName.Mithlond, AreaName.LuneValley, AreaName.EvendimHills, AreaName.TheShire];
const TheShire = [AreaName.TowerHills, AreaName.Buckland];
const forodwaith = [AreaName.Borderlands, AreaName.Angmar, AreaName.EasternAngmar, AreaName.NorthRhun, AreaName.WitheredHeath];
const borderlands = [AreaName.LuneValley, AreaName.EvendimHills, AreaName.NorthDowns, AreaName.Angmar, AreaName.Forodwaith];
const angmar = [AreaName.Forodwaith, AreaName.Borderlands];
const northDownss = [AreaName.Borderlands, AreaName.Fornost];
const fornost = [AreaName.NorthDowns, AreaName.WeatherHills, AreaName.OldForest, AreaName.Buckland];
const weatherHills = [AreaName.Fornost, AreaName.Borderlands, AreaName.OldForest, AreaName.Rhudaur, AreaName.SouthDowns];
const easternAngmar = [AreaName.Forodwaith, AreaName.Carrock];
const rhudaur = [AreaName.WeatherHills, AreaName.Carrock, AreaName.Eregion];
const oldForest = [AreaName.Fornost, AreaName.WeatherHills, AreaName.Buckland, AreaName.SouthDowns];
const buckland = [AreaName.TheShire, AreaName.Fornost, AreaName.OldForest, AreaName.SouthDowns];
const SouthDowns = [AreaName.Buckland, AreaName.OldForest, AreaName.Minhiriath];
const northRhun = [AreaName.Forodwaith, AreaName.WitheredHeath, AreaName.SouthRhun];
const witheredHeath = [AreaName.Forodwaith, AreaName.NorthRhun, AreaName.Esgaroth];
const esgaroth = [AreaName.WitheredHeath, AreaName.NorthMirkWood];
const southRhun = [AreaName.NorthRhun, AreaName.BrownLands];
const carrock = [AreaName.EasternAngmar, AreaName.NorthMirkWood, AreaName.AnduinValley, AreaName.Rhudaur];
const northMirkwood = [AreaName.Carrock, AreaName.EasternMirkwood, AreaName.Esgaroth];
const anduinValley = [AreaName.Carrock, AreaName.EasternMirkwood, AreaName.SouthMirkwood];
const easternMirkwood = [AreaName.NorthMirkWood, AreaName.AnduinValley, AreaName.SouthMirkwood, AreaName.BrownLands];
const southMirkWood = [AreaName.AnduinValley, AreaName.EasternMirkwood, AreaName.BrownLands, AreaName.EmynMuil, AreaName.BrownLands];
const minhiriah = [AreaName.SouthDowns, AreaName.Dunland, AreaName.Enedwaith];
const eregion = [AreaName.Rhudaur, AreaName.Moria, AreaName.Dunland];
const dunland = [AreaName.Eregion, AreaName.Minhiriath, AreaName.Enedwaith];
const enedwaith = [AreaName.Minhiriath, AreaName.Dunland, AreaName.GapOfRohan];
const westRohan = [AreaName.GapOfRohan, AreaName.DrunwaithIaur];
const gapOfRohan = [AreaName.WestRohan, AreaName.Fangorn, AreaName.TheWold, AreaName.MinasTirith];
const fangorn = [AreaName.Lorien, AreaName.TheWold, AreaName.GapOfRohan];
const moria = [AreaName.Eregion, AreaName.GladdenFields];
const gladdenFields = [AreaName.Moria, AreaName.AnduinValley, AreaName.Lorien];
const lorien = [AreaName.GladdenFields, AreaName.Fangorn, AreaName.TheWold];
const theWold = [AreaName.Lorien, AreaName.Fangorn, AreaName.EmynMuil];
const emynMuil = [AreaName.AnduinValley, AreaName.SouthMirkwood, AreaName.BrownLands, AreaName.DeadMarshes];
const brownLands = [AreaName.SouthMirkwood, AreaName.SouthRhun, AreaName.EmynMuil, AreaName.RhunHills, AreaName.DeadMarshes]
const deadMarshes = [AreaName.EmynMuil, AreaName.BrownLands, AreaName.UdunVale, AreaName.Ithilien];
const druwaithIaur = [AreaName.WestRohan, AreaName.Anfalas];
const andrast = [AreaName.Anfalas];
const anfalas = [AreaName.Andrast, AreaName.DrunwaithIaur, AreaName.ValeOfErech];
const valeOfErech = [AreaName.Anfalas, AreaName.Lamedon];
const lamedon = [AreaName.ValeOfErech, AreaName.Belfalas, AreaName.Lebennin];
const belfalas = [AreaName.Lamedon, AreaName.Lebennin];
const lebennin = [AreaName.Belfalas, AreaName.MinasTirith];
const minasTirith = [AreaName.GapOfRohan, AreaName.Lebennin, AreaName.Ithilien];
const ithilien = [AreaName.DeadMarshes, AreaName.SouthIthilien, AreaName.MinasMorgul, AreaName.MinasTirith];
const southIthilien = [AreaName.Ithilien, AreaName.Harondor];
const udunVale = [AreaName.DeadMarshes, AreaName.MountDoom];
const mountDoom = [AreaName.UdunVale, AreaName.BaradDur, AreaName.Gorgoroth];
const baradDur = [AreaName.MountDoom, AreaName.Gorgoroth];
const minasMorgul = [AreaName.Gorgoroth, AreaName.Ithilien];
const nurn = [AreaName.Gorgoroth];
const harondor = [AreaName.SouthIthilien, AreaName.Harad];
const umbar = [AreaName.DeepHarad];
const deepHarad = [AreaName.Umbar, AreaName.Harad];
const harad = [AreaName.Harondor, AreaName.NearHarad];
const nearHarad = [AreaName.Harad, AreaName.Khand];
const Khand = [AreaName.NearHarad];