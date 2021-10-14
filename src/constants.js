import CitationIcon from './images/medals/citation.svg';
import CroixIcon from './images/medals/croix.svg';
import DecorationIcon from './images/medals/decoration.svg';
import DocumentIcon from './images/medals/document.svg';
import CongratulationIcon from './images/medals/felicitations.svg';
import MedalIcon from './images/medals/medaille.svg';
import LegionHonorIcon from './images/medals/legion-honneur.svg';
import OrdreIcon from './images/medals/ordre.svg';

export const AboutRoute = { to: '/about', label: 'À propos' }
export const BrowseRoute = { to:'/browse', label: 'Parcourir'}
export const PersonRoute = { to:'/browse/person/', label: 'Person'}
export const SearchRoute = { to: '/search', label: 'Recherche' }
export const CollectionRoute = { to: '/collection', label: 'Collection' }
export const MediaRoute = { to: '/collection/', label: 'Media' }
export const TermsOfUseRoute = { to:'/terms', label: 'Conditions d\'utilisation'}
export const PrimaryRoutes = [
  AboutRoute,
  BrowseRoute,
  SearchRoute,
  CollectionRoute
];

export const TYPE_IMAGE = "image";
export const TYPE_PDF = "pdf";
export const TYPE_MEDAL = "medal";

export const MEDIA_VIGNETTE = "vignette";

export const MEDAL_ICONS = {
  "Citation": CitationIcon,
  "Croix": CroixIcon,
  "Décoration": DecorationIcon,
  "Document": DocumentIcon,
  "Félicitations": CongratulationIcon,
  "Médaille": MedalIcon,
  "Légion d'honneur": LegionHonorIcon,
  "Ordre": OrdreIcon
}
