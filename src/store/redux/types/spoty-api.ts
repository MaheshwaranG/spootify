export interface SpotyPlaylistIF {
  collaborative: Boolean;
  description: string;
  external_urls: SpotyExternalURLIF;
  href: string;
  id: string;
  images: SpotyImageIF[];
  name: string;
  owner: SpotyUserObject;
  public?: boolean;
  snapshot_id: string;
  tracks?: SpotyPlaylistTrackIF;
  type: string;
  uri: string;
}

export interface SpotyPlaylistTrackIF {
  added_at: Date | null | undefined;
  added_by: SpotyUserObject | null | undefined;
  is_local: boolean;
  track: any;
}

export interface SpotyUserObject {
  display_name: string;
  external_urls: SpotyExternalURLIF;
  followers?: SpotyFollowerIF;
  href: string;
  id: string;
  images: SpotyImageIF[];
  type: string;
  uri: string;
}

export interface SpotyFollowerIF {
  href: string;
  total: number;
}

export interface SpotyExternalURLIF {
  [key: string]: string;
}

export interface SpotyImageIF {
  height: number;
  url: string;
  width: number;
}

export interface SpotyAlbumIF {
  album_group?: string;
  album_type: string;
  artists: SpotyArtistIF[];
  available_markets: Array<string>;
  external_urls: SpotyExternalURLIF;
  href: string;
  id: string;
  images: SpotyImageIF[];
  name: string;
  release_date: string;
  release_date_precision: string; //The precision with which release_date value is known: year , month , or day.
  restrictions?: any;
  type: string;
  uri: string;
}

export interface SpotyArtistIF {
  external_urls: SpotyExternalURLIF;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
