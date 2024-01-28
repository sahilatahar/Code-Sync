export function formatDate(timestamp) {
    const date = new Date(timestamp)

    // Get hours and minutes
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, "0")

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM"

    // Convert to 12-hour format
    hours = hours % 12
    hours = hours ? hours : 12 // Handle midnight

    // Format the date string
    const formattedTime = `${hours}:${minutes} ${amOrPm}`

    return formattedTime
}
