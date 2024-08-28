export const config_app = {
  public: {
    assets: {
      url: process.env.NEXT_PUBLIC_ENDPOINT,
      logo: "/assets/mood_logo_1.png",
      connect_icon: "/assets/connect.png",
      dev: process.env.NODE_ENV,
      alarm: "/assets/mixkit-software-interface-start-2574.wav",
    },
  },
};
