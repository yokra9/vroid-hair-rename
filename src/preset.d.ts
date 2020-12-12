// 実際の JSON から QuicType で生成した型

export interface Preset {
    Hairishes:      Hairish[];
    _MaterialSet:   MaterialSet;
    _DisplayName:   string;
    _MetaData:      MetaData;
    _HairBoneStore: HairBoneStore;
}

export interface Hairish {
    Id:               string;
    Param:            Param;
    Guide:            Guide;
    Type:             number;
    Visibility:       boolean;
    DisplayName:      string;
    Version:          number;
    Points:           HairOrigin[];
    Normals:          HairOrigin[];
    Uvs:              Uv[];
    PairId:           string;
    IsPairSymmetry:   boolean;
    Children:         Hairish[];
    NumControlPoints: number;
    HeadCenter:       HairOrigin;
    HairOrigin:       HairOrigin;
    ColliderPaths:    any[];
    HeadRadius:       number;
}

export interface Guide {
    RawCylinderPoints:    CylinderPoint[];
    OffsetCylinderPoints: CylinderPoint[];
}

export interface CylinderPoint {
    position:   HairOrigin;
    quaternion: HairOrigin;
    hull:       Hull[];
}

export interface Hull {
    angle:  number;
    radius: number;
}

export interface HairOrigin {
    x:  number;
    y:  number;
    z:  number;
    w?: number;
}

export interface Param {
    _Height:                     AngleFrom;
    _Offset:                     AngleFrom;
    _FrontFitness:               AngleFrom;
    _SideFitness:                AngleFrom;
    _Length:                     AngleFrom;
    _UVCenterX:                  AngleFrom;
    _UVCenterY:                  AngleFrom;
    _DivisionCount:              DivisionCount;
    _Width:                      AngleFrom;
    _WidthScale:                 AngleFrom;
    _Thickness:                  AngleFrom;
    _ThicknessScale:             AngleFrom;
    _TwistAmplitude:             DivisionCount;
    _TwistDistortion:            DivisionCount;
    _PositionOffsetX:            DivisionCount;
    _PositionOffsetY:            DivisionCount;
    _TextureWidthScale:          DivisionCount;
    _TextureHeightDistortion:    DivisionCount;
    _TextureOffsetX:             DivisionCount;
    _TextureOffsetY:             DivisionCount;
    _HairCount:                  AngleFrom;
    _GrowFrom:                   AngleFrom;
    _AngleFrom:                  AngleFrom;
    _AngleWidth:                 AngleFrom;
    _ThicknessJitterAmplitude:   AngleFrom;
    _ThicknessJitterFrequency:   AngleFrom;
    _ThicknessJitterShift:       AngleFrom;
    _PartingLength:              AngleFrom;
    _PartingAngle:               AngleFrom;
    _PartingBias:                AngleFrom;
    _TipsCurliness:              AngleFrom;
    _FlowDirection:              AngleFrom;
    _FlowConvergence:            AngleFrom;
    _FlowMirroring:              FlowMirroring;
    _FlowCurvePointT:            AngleFrom;
    _FlowCurvePointDiff:         AngleFrom;
    _FlowDecayCurve:             FlowDecayCurve;
    _WidthCurve:                 WidthCurve;
    _CrossSection:               CrossSection;
    _MaterialHasOwnValue:        boolean;
    _MaterialValueGUID:          string;
    _MaterialInheritedValueGUID: string;
}

export interface AngleFrom {
    _Value: number;
    _Min:   number;
    _Max:   number;
}

export interface CrossSection {
    _Value:          CrossSectionInheritedValue;
    _HasOwnValue:    boolean;
    _InheritedValue: CrossSectionInheritedValue;
}

export interface CrossSectionInheritedValue {
    _Id:              number;
    _DisplayName:     string;
    _Points:          Uv[];
    _ConnectedPoints: number[];
    _IsClosed:        boolean;
    _UScale:          number;
    _UOffset:         number;
}

export interface Uv {
    x: number;
    y: number;
}

export interface DivisionCount {
    _Value:          number;
    _Min:            number;
    _Max:            number;
    _HasOwnValue:    boolean;
    _InheritedValue: number;
}

export interface FlowDecayCurve {
    _Value: CurveClass;
}

export interface CurveClass {
    rawControlPoints: Uv[];
    maxDivision:      number;
    minDistance:      number;
}

export interface FlowMirroring {
    _Value: boolean;
}

export interface WidthCurve {
    _Value:          WidthCurveInheritedValue;
    _HasOwnValue:    boolean;
    _InheritedValue: WidthCurveInheritedValue;
}

export interface WidthCurveInheritedValue {
    _DisplayName: DisplayName;
    _Id:          number;
    _Curve:       CurveClass;
}

export enum DisplayName {
    Empty = "",
    GUIAvatarEditorHairEditorHairEditorViewModelFluffy = "GUI.AvatarEditor.HairEditor.HairEditorViewModel.Fluffy",
    GUIAvatarEditorHairEditorHairPropertyViewModelBaseCustom = "GUI.AvatarEditor.HairEditor.HairPropertyViewModelBase.Custom",
}

export interface HairBoneStore {
    Groups:       Group[];
    RootBoneName: string;
}

export interface Group {
    Id:                 string;
    DisplayName:        string;
    Hairs:              string[];
    Joints:             Joint[];
    WeightAnchorPoints: HairOrigin[];
    AxisHintHairIds:    string[];
    RootBoneName:       string;
    BoneCount:          number;
    SpringRootRate:     number;
    VRMStiffness:       number;
    VRMGravity:         number;
    VRMColliderRadius:  number;
    autoGrouping:       boolean;
}

export interface Joint {
    Position: HairOrigin;
    Rotation: HairOrigin;
    Name:     string;
}

export interface MaterialSet {
    _MaterialSetVersion:       number;
    _Id:                       string;
    _Materials:                Material[];
    _SphereAddTextureIdPrefix: string;
}

export interface Material {
    _VroidMaterialVersion: number;
    _Id:                   string;
    _Color:                Color;
    _ShadeColor:           Color;
    _HighlightColor:       Color;
    _OutlineColor:         Color;
    _MainTextureId:        string;
    _SphereAddTextureId:   string;
    _RenderQueue:          number;
    _PrototypeId:          string;
    _Tags:                 string[];
}

export interface Color {
    r: number;
    g: number;
    b: number;
}

export interface MetaData {
    metaDataVersion:         number;
    vroidVersionMajor:       number;
    vroidVersionMinor:       number;
    vroidVersionPatch:       number;
    vroidVersionExtra:       string;
    updateVroidVersionMajor: number;
    updateVroidVersionMinor: number;
    updateVroidVersionPatch: number;
    updateVroidVersionExtra: string;
    baseModelId:             string;
    vroidHub:                VroidHub;
    avatarCategory:          string;
}

export interface VroidHub {
    characterModelRelationId: string;
}
