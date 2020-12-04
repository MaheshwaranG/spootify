import {
  FeatureListActionPayloadIF,
  SpotyDataList,
} from "../../store/redux/types/spoty";
import {
  SpotyAlbumIF,
  SpotyPlaylistIF,
} from "../../store/redux/types/spoty-api";

export const spotyDataListFromSpotyPlayList = (
  playList: SpotyPlaylistIF[]
): SpotyDataList[] => {
  const list: SpotyDataList[] = playList.map((item: SpotyPlaylistIF) => {
    const playlist: SpotyDataList = {
      id: item.id,
      images: item.images.length > 0 ? item.images[0] : undefined,
      message: item.description,
      name: item.name,
      url: item.href,
    };
    return playlist;
  });
  return list;
};

export const spotyDataListFromSpotyAlbums = (
  albums: SpotyAlbumIF[]
): SpotyDataList[] => {
  const list: SpotyDataList[] = albums.map((item: SpotyAlbumIF) => {
    // const date : string = moment().format("MMM Do YY");
    let artistsNames: string = !!item.artists.length
      ? item.artists
          .map((artist) => artist.name)
          .reduce((state: string, artist: string): string => {
            return state + artist;
          }, "")
      : " - ";
    const playlist: SpotyDataList = {
      id: item.id,
      images: item.images.length > 0 ? item.images[0] : undefined,
      message: artistsNames,
      name: item.name,
      url: item.href,
    };
    return playlist;
  });
  return list;
};
