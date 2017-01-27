'use strict';

const $ = (string) => { return document.querySelector(string) };
const route = '/users';
let stubbed = 0;

const switchData = (evt) => {
  const i = evt.currentTarget.selectedIndex;
  console.log(i);
}

const buildUrl = () => {
  const source = $('#source').value === 'real'
    ? 'jsonplaceholder.typicode.com' : `${window.location.hostname}:3001`;
  const userId = $('#userId').selectedIndex + 1;
  const protocol = window.location.protocol;
  const url = `${protocol}//${source}${route}/${userId}`;
  return url;
}

const getData = () => {
  const url = buildUrl();
  console.log(url);
  fetch(url)
    .then((r) => {
      return r.json()
    })
    .then((data) => {
      console.log(data);
      $('pre').innerHTML = JSON.stringify(data, null, 2);
      $('small').innerHTML = url;
    });
}
