import { DataReadingKey } from "../interfaces/global";
const SKY_COLOR = "#90e0ef";
const GREEN_COLOR = "#a7c957";
const YELLOW_COLOR = "#ffd60a";
const RED_COLOR = "#d62828";
const DARK_RED_COLOR = "#780000";
const HAZARD_COLOR = "#370617";
const readingColor = (readValue: number, readType: DataReadingKey): string => {
    if (readType === "AQI") {
        if (readValue < 50) return GREEN_COLOR;
        if (readValue > 50 && readValue < 100) return YELLOW_COLOR;
        if (readValue > 100 && readValue < 150) return RED_COLOR;
        if (readValue > 150 && readValue < 200) return DARK_RED_COLOR;
        if (readValue > 200 && readValue < 500) return HAZARD_COLOR;
    };
    if (readType === "temperatureC") {
        if (readValue < 0) return "blue";
        if (readValue > 0 && readValue < 22) return SKY_COLOR;
        if (readValue > 22 && readValue < 30) return YELLOW_COLOR;
        if (readValue > 40) return DARK_RED_COLOR;
    };
    if (readType === "humidity") {
        if (readValue < 25) return SKY_COLOR;
        if (readValue > 25 && readValue < 50) return YELLOW_COLOR;
        if (readValue > 50 && readValue < 75) return RED_COLOR;
        if (readValue > 75 && readValue < 100) return DARK_RED_COLOR
    };
    if (readType === "dustPercentage") return "#bc6c25"
    return "";
};
export default readingColor;