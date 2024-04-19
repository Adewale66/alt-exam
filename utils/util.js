export default function readingTime(words) {
    const readingSpeed = Math.floor(Math.random() * (250 - 200 + 1)) + 200;
    return Math.floor(words.length / readingSpeed);
}

function orderByTimeStamp(a, b) {
    return a.timestamp - b.timestamp;
}

function orderByReadCount(a, b) {
    return a.read_count - b.read_count;
}

function orderByReadTime(a, b) {
    a.reading_time - b.reading_time;
}

export { orderByReadCount, orderByReadTime, orderByTimeStamp };
