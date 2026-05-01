fetch('https://formsubmit.co/ajax/tizoci', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test',
    email: 'yok@test.com',
    message: 'Node test message'
  })
}).then(r=>r.json()).then(console.log).catch(console.error);
