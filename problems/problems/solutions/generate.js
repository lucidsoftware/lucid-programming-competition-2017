let prob = [];
let n = 5;
let k = 10000
prob.push(n + ' ' + k);
let names = {
    0: 'problems',
    1: 'elavator',
    2: 'eating_pizza',
    3: 'stuck',
    4: 'kdtree',
    5: 'i18n',
    6: 'resize',
    7: 'polygons',
}
for(let i=0; i<k; i++) {
    prob.push(names[Math.floor(Math.random()*n)] + ' ' + Math.floor(Math.random()*n))
}
console.log(prob.join('\n'));