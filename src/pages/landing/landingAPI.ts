import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURI } from "../../constants/main"

export type LandingItem = {
  name: string;
  username: string;
  address: string;
  company: {bs: string; catchPhrase: string; name: string};
  email: string;
  id: number;
  phone: string;
  website: string;
}


export type LandingItemsResponse = Array<LandingItem>

export const landingAPI = createApi({
  reducerPath: "landingAPI",
  tagTypes: ["Landings"],
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (build) => ({
    getLandingItems: build.mutation<LandingItemsResponse, void>({
      query: () => `/users`,
    }),
    getAllLandingItems: build.query<LandingItemsResponse, void>({
      query: () => `/users`,
    }),
    getLandingItemById: build.mutation<LandingItem, string>({
      query: (user_id) => `/users${user_id ? `/${user_id}` : ''}`,
    }),
  }),
})

export const { useGetLandingItemsMutation, useGetLandingItemByIdMutation, useGetAllLandingItemsQuery } = landingAPI
