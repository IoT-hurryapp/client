import { DARK_RED_COLOR, GREEN_COLOR, HAZARD_COLOR, RED_COLOR, SKY_COLOR, YELLOW_COLOR } from "../constants/readingColors";
import { DataReadingKey } from "../interfaces/global";

const readingColor = (readValue: number, readType: DataReadingKey): string => {
    if (readType === "AQI") {
        if (readValue <= 50) return GREEN_COLOR;
        if (readValue > 50 && readValue <= 100) return YELLOW_COLOR;
        if (readValue > 100 && readValue <= 150) return RED_COLOR;
        if (readValue > 150 && readValue <= 200) return DARK_RED_COLOR;
        if (readValue > 200 && readValue <= 500) return HAZARD_COLOR;
    };
    if (readType === "temperatureC") {
        if (readValue < 0) return SKY_COLOR;
        if (readValue >= 0 && readValue <= 16) return SKY_COLOR;
        if (readValue >= 17 && readValue <= 32) return YELLOW_COLOR;
        if (readValue >= 40) return RED_COLOR;
    };
    if (readType === "humidity") {
        if (readValue < 25) return SKY_COLOR;
        if (readValue >= 25 && readValue < 50) return YELLOW_COLOR;
        if (readValue >= 50 && readValue < 75) return RED_COLOR;
        if (readValue >= 75 && readValue < 100) return DARK_RED_COLOR
    };
    if (readType === "dustPercentage") {
        if (readValue >= 0 && readValue <= 25) return GREEN_COLOR
        if (readValue >= 26 && readValue <= 50) return YELLOW_COLOR
        if (readValue >= 51 && readValue <= 75) return RED_COLOR
        if (readValue >= 76 && readValue <= 100) return DARK_RED_COLOR
    }
    return "";
};
const readingStatus = (readValue: number, readType: DataReadingKey) => {
    if (readType === "AQI") {
        if (readValue <= 50) return "ممتاز";
        if (readValue > 50 && readValue <= 100) return "جيد";
        if (readValue > 100 && readValue <= 150) return "وسط";
        if (readValue > 150 && readValue <= 200) return "خطورة";
        if (readValue > 200 && readValue <= 500) return "خطورة عالية";
    };
    if (readType === "temperatureC") {
        if (readValue < 0) return "تحت الصفر";
        if (readValue >= 0 && readValue <= 16) return "ممتاز";
        if (readValue >= 17 && readValue <= 32) return "معتدل";
        if (readValue >= 40) return "حار";
    };
    if (readType === "humidity") {
        if (readValue <= 25) return "ممتاز";
        if (readValue >= 25 && readValue < 50) return "جيد";
        if (readValue >= 50 && readValue < 75) return "وسط";
        if (readValue >= 75 && readValue < 100) return "خطر"
    };
    if (readType === "dustPercentage") {
        if (readValue >= 0 && readValue <= 25) return "ممتاز"
        if (readValue >= 26 && readValue <= 50) return "وسط"
        if (readValue >= 51 && readValue <= 75) return "خطر"
        if (readValue >= 76 && readValue <= 100) return "خطورة عالية"
    }
    return "";
}
export { readingColor, readingStatus };