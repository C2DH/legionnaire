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

export const MEDIA_VIGNETTE = "vignette";
