export function webpack(config) {
   config.watchOptions.poll = 300;
   return config;
}