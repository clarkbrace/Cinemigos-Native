
export const valueScaler = (number: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}