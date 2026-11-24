(()=>{
const travel=document.querySelector('#details'),theatre=travel.querySelector('.destination-theatre');
theatre.append(travel.querySelector('h2'),travel.querySelector('.travel-copy'));
const replay=theatre.querySelector('.curtain-replay');replay.textContent='Replay reveal';
const credit=document.createElement('a');credit.className='destination-credit';credit.href='https://unsplash.com/s/photos/city-palace%2C-jaipur%2C-india';credit.target='_blank';credit.rel='noopener';credit.textContent='Photo · Unsplash';theatre.append(credit);
})();
