export function formatDate(date) {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date(date))
}