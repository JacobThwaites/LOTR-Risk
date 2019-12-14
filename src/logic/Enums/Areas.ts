import { Area } from '../Models/Area';
import { AreaName } from './AreaNames';
import * as  Adjacencies from './AreaAdjacencies';

export const Areas = {
    Forlindon: new Area(AreaName.Forlindon, false, false, Adjacencies.Forlindon),
    Mithlond: new Area(AreaName.Mithlond, false, true, Adjacencies.Mithlond),
    EvendimHills: new Area(AreaName.EvendimHills, true, false, Adjacencies.EvendimHills),
    TowerHills: new Area(AreaName.TowerHills, false, false, Adjacencies.TowerHills),
    LuneValley: new Area(AreaName.LuneValley, false, false, Adjacencies.LuneValley),
    TheShire: new Area(AreaName.TheShire, false, true, Adjacencies.TheShire),
    Harlindon: new Area(AreaName.Harlindon, false, true, Adjacencies.Harlindon),
    Forodwaith: new Area(AreaName.Forodwaith, false, true, Adjacencies.Forodwaith),
    EasternAngmar: new Area(AreaName.EasternAngmar, false, true, Adjacencies.EasternAngmar),
    Angmar: new Area(AreaName.Angmar, false, false, Adjacencies.Angmar),
    Borderlands: new Area(AreaName.Borderlands, false, false, Adjacencies.Borderlands),
    NorthDowns: new Area(AreaName.NorthDowns, false, false, Adjacencies.NorthDowns),
    Rhudaur: new Area(AreaName.Rhudaur, true, false, Adjacencies.Rhudaur),
    WeatherHills: new Area(AreaName.WeatherHills, false, true, Adjacencies.WeatherHills),
    Fornost: new Area(AreaName.Fornost, false, true, Adjacencies.Fornost),
    OldForest: new Area(AreaName.OldForest, false, false, Adjacencies.OldForest),
    Buckland: new Area(AreaName.Buckland, false, false, Adjacencies.Buckland),
    SouthDowns: new Area(AreaName.SouthDowns, false, false, Adjacencies.SouthDowns),
    NorthRhun: new Area(AreaName.NorthRhun, false, false, Adjacencies.NorthRhun),
    WitheredHeath: new Area(AreaName.WitheredHeath, false, false, Adjacencies.WitheredHeath),
    Esgaroth: new Area(AreaName.Esgaroth, false, true, Adjacencies.Esgaroth),
    SouthRhun: new Area(AreaName.SouthRhun, false, false, Adjacencies.SouthRhun),
    Carrock: new Area(AreaName.Carrock, false, false, Adjacencies.Carrock),
    NorthMirkwood: new Area(AreaName.NorthMirkwood, false, true, Adjacencies.NorthMirkwood),
    AnduinValley: new Area(AreaName.AnduinValley, false, false, Adjacencies.AnduinValley),
    EasternMirkwood: new Area(AreaName.EasternMirkwood, false, false, Adjacencies.EasternMirkwood),
    SouthMirkwood: new Area(AreaName.SouthMirkwood, true, false, Adjacencies.SouthMirkwood),
    Eregion: new Area(AreaName.Eregion, false, true, Adjacencies.Eregion),
    Minhiriath: new Area(AreaName.Minhiriath, false, true, Adjacencies.Minhiriath),
    Dunland: new Area(AreaName.Dunland, false, false, Adjacencies.Dunland),
    Enedwaith: new Area(AreaName.Enedwaith, false, false, Adjacencies.Enedwaith),
    Fangorn: new Area(AreaName.Fangorn, true, false, Adjacencies.Fangorn),
    WestRohan: new Area(AreaName.WestRohan, true, false, Adjacencies.WestRohan),
    GapOfRohan: new Area(AreaName.GapOfRohan, false, true, Adjacencies.GapOfRohan),
    Moria: new Area(AreaName.Moria, true, false, Adjacencies.Moria),
    GladdenFields: new Area(AreaName.GladdenFields, false, false, Adjacencies.GladdenFields),
    Lorien: new Area(AreaName.Lorien, false, true, Adjacencies.Lorien),
    TheWold: new Area(AreaName.TheWold, false, true, Adjacencies.TheWold),
    EmynMuil: new Area(AreaName.EmynMuil, false, false, Adjacencies.EmynMuil),
    RhunHills: new Area(AreaName.RhunHills, false, false, Adjacencies.RhunHills),
    DeadMarshes: new Area(AreaName.DeadMarshes, false, true, Adjacencies.DeadMarshes),
    BrownLands: new Area(AreaName.BrownLands, false, false, Adjacencies.BrownLands),
    DruwaithIaur: new Area(AreaName.DruwaithIaur, false, false, Adjacencies.DruwaithIaur),
    Andrast: new Area(AreaName.Andrast, false, false, Adjacencies.Andrast),
    Anfalas: new Area(AreaName.Anfalas, false, false, Adjacencies.Anfalas),
    ValeOfErech: new Area(AreaName.ValeOfErech, false, true, Adjacencies.ValeOfErech),
    Lamedon: new Area(AreaName.Lamedon, false, false, Adjacencies.Lamedon),
    Belfalas: new Area(AreaName.Belfalas, false, true, Adjacencies.Belfalas),
    Lebennin: new Area(AreaName.Lebennin, false, true, Adjacencies.Lebennin),
    MinasTirith: new Area(AreaName.MinasTirith, true, false, Adjacencies.MinasTirith),
    Ithilien: new Area(AreaName.Ithilien, false, true, Adjacencies.Ithilien),
    SouthIthilien: new Area(AreaName.SouthIthilien, false, false, Adjacencies.SouthIthilien),
    UdunVale: new Area(AreaName.UdunVale, true, false, Adjacencies.UdunVale),
    MountDoom: new Area(AreaName.MountDoom, false, true, Adjacencies.MountDoom),
    BaradDur: new Area(AreaName.BaradDur, false, false, Adjacencies.BaradDur),
    Gorgoroth: new Area(AreaName.Gorgoroth, true, false, Adjacencies.Gorgoroth),
    MinasMorgul: new Area(AreaName.MinasMorgul, true, false, Adjacencies.MinasMorgul),
    Nurn: new Area(AreaName.Nurn, false, false, Adjacencies.Nurn),
    Harondor: new Area(AreaName.Harondor, false, false, Adjacencies.Harondor),
    Umbar: new Area(AreaName.Umbar, true, false, Adjacencies.Umbar),
    DeepHarad: new Area(AreaName.DeepHarad, false, false, Adjacencies.DeepHarad),
    Harad: new Area(AreaName.Harad, false, false, Adjacencies.Harad),
    NearHarad: new Area(AreaName.NearHarad, false, false, Adjacencies.NearHarad),
    Khand: new Area(AreaName.Khand, false, true, Adjacencies.Khand),
}