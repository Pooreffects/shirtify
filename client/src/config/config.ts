interface Config {
  backendUrl: string;
}

const config: { development: Config; production: Config } = {
  development: {
    backendUrl: "http://localhost:8080/api/v1/dalle",
  },
  production: {
    backendUrl: "https://devswag.onrender.com/api/v1/dalle",
  },
};

export default config;
