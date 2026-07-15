export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.vlagalabs.com.br" || url.protocol === "http:") {
      url.hostname = "vlagalabs.com.br";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
