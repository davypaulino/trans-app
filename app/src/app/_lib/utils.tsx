export const generateRandomCode = (): string => {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
};

export const generateRandomName = (): string => {
    const names = ["Carlinhos95", "PlayerOne", "GamerGirl", "NinjaWarrior", "Speedster"];
    return names[Math.floor(Math.random() * names.length)];
};