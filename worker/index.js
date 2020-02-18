const { countries } = require("countries-list");

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method, url } = request;
  const continent = resolveContinent(request);
  const isHttpGet = method === "GET";
  const isRootUrl = url === "https://dev.events" || url === "https://dev.events/";
  if (isHttpGet && isRootUrl && continent) {
    return redirect("https://dev.events/" + continent);
  } else {
    const response = await fetch(request);
    return response;
  }
}

function resolveContinent(request) {
  const country = request.headers.get("cf-ipcountry");
  if (!country) {
    return undefined;
  }
  const continent = countries[country].continent;
  if (!continent) {
    return undefined;
  }

  return continent
    .replace("SA", "AM")
    .replace("NA", "AM");
}
	
function redirect(url) {
  return Response.redirect(url, 302);
}
