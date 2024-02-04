class FetchInterceptor {
  constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.setLoadingFunction = null;
  }

  setLoadStateFunction(setLoading) {
    this.setLoadingFunction = setLoading;
  }

  setLoadState(state) {
    if (this.setLoadingFunction) {
      this.setLoadingFunction(state);
    }
  }

  addRequestInterceptor(callback) {
    this.requestInterceptors.push(callback);
  }

  addResponseInterceptor(callback) {
    this.responseInterceptors.push(callback);
  }

  async fetchWithInterceptors(...args) {
    let [resource, config] = args;

    for (const interceptor of this.requestInterceptors) {
      const result = interceptor(resource, config);
      if (result) {
        [resource, config] = result;
      }
    }

    this.setLoadState(true);

    try {
      const response = await fetch(resource, config);

      for (const interceptor of this.responseInterceptors) {
        const modifiedResponse = interceptor(response);
        if (modifiedResponse) {
          return modifiedResponse;
        }
      }

      return response;
    } finally {
      this.setLoadState(false);
    }
  }
}

export const fetchInterceptor = new FetchInterceptor();
