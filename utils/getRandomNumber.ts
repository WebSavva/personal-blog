export default function getRandomValue(a:number = 1, b:number = 5) {
    return Math.floor(Math.random() * (b - a)) + a;
}