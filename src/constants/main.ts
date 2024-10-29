export const PATH = {
  landing: {
    auth: false,
    getURI: () => "/"
  },
  todo: {
    auth: false,
    getURI: (user_id = ":user_id") => `/todo/${user_id}`
  },
  summary: {
    auth: false,
    getURI: () => "/summary"
  }
}

export const baseURI: string = "https://jsonplaceholder.typicode.com"

