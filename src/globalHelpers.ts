
export function filterData(mapData: any[], who: string) {
    const seen = new Set();
    return mapData.reduce((result, item) => {
        if (!seen.has(item[who])) {
            seen.add(item[who]);
            result.push({
                [who]: item[who],
                address: item['address'],
                coordinates: item['coordinates']
            })};
        return result;
    }, []);
};

export function createGoogleMapLink(address: string) {
    var encodedAddress = encodeURIComponent(address); // Encode address for URL
    return "https://www.google.com/maps/search/?api=1&query=" + encodedAddress;
  };
  