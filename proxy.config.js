const PROXY_CONFIG = {
     "/sofea-fase2Service/api/*": {
        "target":  {
            "host": "li2233",
            "protocol": "http:",

          },
        "secure": false,
        "changeOrigin": true,
        "logLevel": "info",
        "bypass": function (req, res, proxyOptions) {
            // if (req.headers.accept.indexOf("html") !== -1) {
            //    console.log("Skipping proxy for browser request.");
            //    return "/index.html";
            // }
            // req.headers["Bearer"] = "yes";
        }
    }
}

module.exports = PROXY_CONFIG;
