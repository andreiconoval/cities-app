// models/geonames.ts

export interface GeoNamesResponse {
  timezone: Timezone;
  bbox: BoundingBox;
  asciiName: string;
  astergdem: number;
  countryId: string;
  fcl: string;
  srtm3: number;
  countryCode: string;
  adminCodes1: AdminCodes1;
  adminId1: string;
  lat: string;
  fcode: string;
  continentCode: string;
  adminCode1: string;
  lng: string;
  geonameId: number;
  toponymName: string;
  population: number;
  wikipediaURL: string;
  alternateNames: AlternateName[];
  countryName: string;
  fcodeName: string;
  adminName1: string;
}

export interface Timezone {
  gmtOffset: number;
  timeZoneId: string;
  dstOffset: number;
}

export interface BoundingBox {
  east: number;
  south: number;
  north: number;
  west: number;
  accuracyLevel: number;
}

export interface AdminCodes1 {
  ISO3166_2: string;
}

export interface AlternateName {
  name: string;
  lang?: string;
  isPreferredName?: boolean;
}
