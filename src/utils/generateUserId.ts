export function generateUserId(): string {
    const random1 = Math.random().toString(36).substring(2);
    const random2 = Math.random().toString(36).substring(2);
    const random3 = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
    return `${random1}-${random2}-${random3}`;
}
