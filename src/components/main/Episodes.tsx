import { IncomingHttpHeaders } from "http";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";

interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

const getCharacterId = (character: string) => {
  const splittedArr = character.split("/");
  return splittedArr[splittedArr.length - 1];
};

const getCharacterIds = (characters: string[]) => {
  if (characters.length <= 0) {
    return [];
  }
  return characters.map(getCharacterId);
};

interface IEpisodeList {
  setCharacterIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const EpisodesList: React.FC<IEpisodeList> = ({ setCharacterIds }) => {
  const { data, status } = useQuery("episodes", () =>
    fetch(`https://rickandmortyapi.com/api/episode`).then((res) => res.json())
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  const handleCharacterIds = (characters: string[]): void => {
    const charIdsArr = getCharacterIds(characters);
    setCharacterIds(charIdsArr);
  };

  return (
    <div className="list">
      {data &&
        data.results &&
        data.results.map((episode: IEpisode) => (
          <NavLink
            className="context-list"
            activeClassName="context-active"
            to={`/episodes/${episode.id}/`}
            key={episode.id}
            onClick={() => handleCharacterIds(episode.characters)}
          >
            <div>{episode.name}</div>
          </NavLink>
        ))}
    </div>
  );
};

interface ICharacterProps {
  characterId: string;
}

interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  locatiion: {
    name: string;
    link: string;
  };
  image: string;
  episode: string;
  url: string;
  created: string;
}

const CharacterListItem: React.FC<ICharacterProps> = ({ characterId }) => {
  const { data, status }: { data: ICharacter; status: string } = useQuery(
    ["character", characterId],
    () =>
      fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      ).then((res) => res.json())
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }
  return <div>{data.name}</div>;
};

interface IContent {
  characterIds: string[];
}

const Content: React.FC<IContent> = ({ characterIds }) => {
  return (
    <div className="content">
      {characterIds.length > 0 &&
        characterIds.map((characterId: string) => (
          <CharacterListItem key={characterId} characterId={characterId} />
        ))}
    </div>
  );
};

export const Episodes = () => {
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  return (
    <div className="main dimension">
      <EpisodesList setCharacterIds={setCharacterIds} />
      <Content characterIds={characterIds} />
    </div>
  );
};
