'use strict';

const $ = (string) => { return document.querySelector(string) };
const route = '/users';
let source = ''; 
let userId = 0; 

const switchData = (evt) => {
  const i = evt.currentTarget.selectedIndex;
  console.log(i);
}

const buildUrl = () => {
  userId = $('#userId').selectedIndex + 1; 
  switch($('#source').value) { 
    case 'real': 
      source = 'jsonplaceholder.typicode.com'; 
      break; 
    case 'proxy': 
      source = `${window.location.hostname}:3001`; 
      userId = `proxy?user=${userId}`; 
      break; 
    default: 
      // 'stubbed' 
      source = `${window.location.hostname}:3001`; 
      break; 
  } 
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
