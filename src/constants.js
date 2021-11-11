import CitationIcon from './images/medals/citation.svg';
import CroixIcon from './images/medals/croix.svg';
import DecorationIcon from './images/medals/decoration.svg';
import DocumentIcon from './images/medals/document.svg';
import CongratulationIcon from './images/medals/felicitations.svg';
import MedalIcon from './images/medals/medaille.svg';
import LegionHonorIcon from './images/medals/legion-honneur.svg';
import OrdreIcon from './images/medals/ordre.svg';

export const HomeRoute = { to: '/', label: 'Accueil', slug: 'homepage' }
export const AboutRoute = { to: '/about', label: 'À propos', slug: 'about' }
export const BrowseRoute = { to:'/browse', label: 'Parcourir'}
export const PersonRoute = { to:'/browse/person/', label: 'Person'}
export const PlaceRoute = { to:'/browse/place/', label: 'Place'}
export const SearchRoute = { to: '/search', label: 'Recherche' }
export const CollectionRoute = { to: '/collection', label: 'Collection' }
export const MediaRoute = { to: '/collection/', label: 'Media' }
export const TimelineRoute = { to: '/timeline', label: 'Chronologie', slug: 'timeline' }
export const TermsOfUseRoute = { to:'/terms-of-use', label: 'Conditions d\'utilisation', slug: 'terms-of-use'}
export const PrimaryRoutes = [
  AboutRoute,
  BrowseRoute,
  SearchRoute,
  CollectionRoute,
  TimelineRoute
];
export const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'fr_FR';

export const TYPE_IMAGE = "image";
export const TYPE_PDF = "pdf";
export const TYPE_MEDAL = "medal";
export const TYPE_PERSON = "person";

export const MEDIA_VIGNETTE = "vignette";

export const EVENT_BIRTH = "birth";
export const EVENT_DEATH = "death";

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
