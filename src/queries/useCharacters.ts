import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const endpoint = "https://rickandmortyapi.com/graphql/";

export function useCharacters() {
  return useQuery("characters", async () => {
    const {
      characters: { data },
    } = await request(
      endpoint,
      gql`
        query {
          characters(page: 1, filter: { name: "rick" }) {
            info {
              count
            }
            results {
              name
            }
          }
          character(id: 1) {
            id
          }
        }
      `
    );
    return data;
  });
}
