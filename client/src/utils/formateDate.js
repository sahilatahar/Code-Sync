export function formatDate(timestamp) {
    const date = new Date(timestamp)

    // Get day, month, year
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    // Get hours and minutes
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, "0")

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM"

    // Convert to 12-hour format
    hours = hours % 12
    hours = hours ? hours : 12 // Handle midnight

    // Format the date string
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`

    return formattedDate
}
