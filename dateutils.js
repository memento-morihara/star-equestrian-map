
export function howManyDays(lastCollected) {
    const date = new Date(lastCollected).getUTCMilliseconds();
    const today = new Date();

    const delta = Math.floor((new Date().getUTCMilliseconds() - date) / 1000 / 60 / 60 / 24);
    return today.getUTCDate() - new Date(lastCollected).getUTCDate();
}