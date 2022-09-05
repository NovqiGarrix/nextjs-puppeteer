export default function getBaseURL() {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}