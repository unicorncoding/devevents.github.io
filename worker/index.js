const { countries } = require("countries-list");

addEventListener('fetch', event => {
  console.log(event);
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  console.log(request);
  const country = request.headers.get('cf-ipcountry')
  console.log(country);
  console.log(countries[country].continent);
  const response = await fetch(request);
  return response;
  // return redirect(request)
}
	
function redirect(request) {
  const country = request.headers.get('cf-ipcountry')
  const url = countryMap[country]
  return Response.redirect(url)
}

const countryMap = {
  "US" : "https://example.com/us",
  "EU": "https://eu.example.com/"
}