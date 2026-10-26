import React from 'react';
import {
  KameleonSvg,
  VlinderSvg,
  SchildpadSvg,
  RegenboogSvg,
  RaketSvg,
  LieveheersbeestjeSvg,
  WalvisSvg,
  ZonnebloemSvg,
  KasteelSvg,
  ZeilbootSvg,
} from './OriginalTemplates';
import {
  OlifantSvg,
  LeeuwSvg,
  DinoSvg,
  PandaSvg,
  KikkerSvg,
  UilSvg,
  EendjeSvg,
  VisSvg,
  SlakSvg,
  PaardSvg,
  KrabSvg,
  RupsSvg,
  GirafSvg,
} from './AnimalTemplates';
import {
  BrandweerautoSvg,
  VliegtuigSvg,
  LuchtballonSvg,
  TreinSvg,
  IjsjeSvg,
  AppelboomSvg,
  PaddenstoelSvg,
} from './VehiclesAndFantasyTemplates';

interface ColoringCanvasProps {
  templateId: string;
  svgRef: React.RefObject<SVGSVGElement | null>;
  svgClassName: string;
  fillState: Record<string, string>;
  onPartClick: (partKey: string) => void;
}

export const ColoringCanvas: React.FC<ColoringCanvasProps> = ({
  templateId,
  svgRef,
  svgClassName,
  fillState,
  onPartClick,
}) => {
  const props = { svgRef, svgClassName, fillState, onPartClick };

  switch (templateId) {
    // 1-10 Original
    case 'kameleon':
      return <KameleonSvg {...props} />;
    case 'vlinder':
      return <VlinderSvg {...props} />;
    case 'schildpad':
      return <SchildpadSvg {...props} />;
    case 'regenboog':
      return <RegenboogSvg {...props} />;
    case 'raket':
      return <RaketSvg {...props} />;
    case 'lieveheersbeestje':
      return <LieveheersbeestjeSvg {...props} />;
    case 'walvis':
      return <WalvisSvg {...props} />;
    case 'zonnebloem':
      return <ZonnebloemSvg {...props} />;
    case 'kasteel':
      return <KasteelSvg {...props} />;
    case 'zeilboot':
      return <ZeilbootSvg {...props} />;

    // 11-23 Animals
    case 'olifant':
      return <OlifantSvg {...props} />;
    case 'leeuw':
      return <LeeuwSvg {...props} />;
    case 'dinosaurus':
      return <DinoSvg {...props} />;
    case 'panda':
      return <PandaSvg {...props} />;
    case 'kikker':
      return <KikkerSvg {...props} />;
    case 'uil':
      return <UilSvg {...props} />;
    case 'eendje':
      return <EendjeSvg {...props} />;
    case 'vis':
      return <VisSvg {...props} />;
    case 'slak':
      return <SlakSvg {...props} />;
    case 'paard':
      return <PaardSvg {...props} />;
    case 'krab':
      return <KrabSvg {...props} />;
    case 'rups':
      return <RupsSvg {...props} />;
    case 'giraf':
      return <GirafSvg {...props} />;

    // 24-30 Vehicles & Fantasy
    case 'brandweerauto':
      return <BrandweerautoSvg {...props} />;
    case 'vliegtuig':
      return <VliegtuigSvg {...props} />;
    case 'luchtballon':
      return <LuchtballonSvg {...props} />;
    case 'trein':
      return <TreinSvg {...props} />;
    case 'ijsje':
      return <IjsjeSvg {...props} />;
    case 'appelboom':
      return <AppelboomSvg {...props} />;
    case 'paddenstoel':
      return <PaddenstoelSvg {...props} />;

    default:
      return <KameleonSvg {...props} />;
  }
};
