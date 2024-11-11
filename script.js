const API_URL_ISS = 'https://api.wheretheiss.at/v1/satellites/25544'; // ISS API

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getISSData() {
    const data = await fetchData(API_URL_ISS);
    const issData = {
        lat: data.latitude,
        lng: data.longitude,
        alt: data.altitude,
        vel: data.velocity
    };
    return issData;
}

function updateISSDataOnDOM(lat, lng, alt, vel) {
    document.getElementById('breiddargráða').textContent = lat.toFixed(5);
    document.getElementById('lengdargráða').textContent = lng.toFixed(5);
    document.getElementById('hæð').textContent = alt.toFixed(2);
    document.getElementById('hraði').textContent = vel.toFixed(2);
}

function initISSDataUpdate() {
    setInterval(() => {
        getISSData().then(issData => {
            updateISSDataOnDOM(issData.lat, issData.lng, issData.alt, issData.vel);
        });
    }, 2000);
}

window.onload = initISSDataUpdate;
