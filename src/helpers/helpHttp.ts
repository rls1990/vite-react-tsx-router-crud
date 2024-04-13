export interface ErrorReq {
  err: boolean;
  status: string | number;
  statustext: string;
}

export const helpHttp = () => {
  const customFetch = (
    endpoint: RequestInfo | URL,
    options: RequestInit | undefined
  ) => {
    const defaultHeaders = {
      accept: "application/json",
    };

    const controller = new AbortController();

    if (options) {
      options.signal = controller.signal;
      //console.log(options.signal);

      options.method = options.method || "GET";

      options.headers = options.headers
        ? { ...defaultHeaders, ...options.headers }
        : defaultHeaders;
    }

    setTimeout(() => {
      controller.abort();
    }, 60000);

    //console.log(options);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statustext: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url: RequestInfo | URL, options: RequestInit | undefined = {}) =>
    customFetch(url, options);
  const post = (
    url: RequestInfo | URL,
    options: RequestInit | undefined = {}
  ) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (
    url: RequestInfo | URL,
    options: RequestInit | undefined = {}
  ) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (
    url: RequestInfo | URL,
    options: RequestInit | undefined = {}
  ) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return { get, post, put, del };
};
