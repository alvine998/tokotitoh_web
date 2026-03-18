export const toMoney = (number: number) => {
    // Check if the input is a valid number
    if (isNaN(number)) {
        throw new Error("Input must be a valid number");
    }

    // Convert the number to a string with two decimal places
    let price = number?.toFixed(0);

    // Add comma as thousands separator
    price = price?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Add the currency symbol
    return `${price}`;
}

// Create a function to convert the object to a query string
export const createQueryString = (filters: any) => {
    const params = new URLSearchParams();
    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            params.append(key, filters[key]);
        }
    }
    return params.toString();
};

export function normalizePhoneNumber(phoneNumber: any) {
    if (phoneNumber.startsWith('+62')) {
        return '62' + phoneNumber?.slice(3);
    } else if (phoneNumber.startsWith('0')) {
        return '62' + phoneNumber?.slice(1);
    } else if (phoneNumber.startsWith('8')) {
        return '62' + phoneNumber;
    } else {
        return phoneNumber;
    }
}

export const getImageUrl = (url: string | null | undefined) => {
    if (!url || url === "undefined" || url === "null") return "/images/tokotitoh.png";
    if (url.startsWith("http://")) {
        return url.replace("http://", "https://");
    }
    if (url.startsWith("https://") || url.startsWith("/")) {
        return url;
    }
    // If it's a raw filename, prefix with the API base URL
    return `https://api.tokonyang.com/${url}`;
};