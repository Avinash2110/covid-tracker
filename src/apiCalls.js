export const fetchCountryData = () =>{
    return fetch(`https://disease.sh/v3/covid-19/countries`)
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const fetchCountryStatus = (url) =>{
    return fetch(url)
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}