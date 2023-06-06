export default async function fetchWrapper(
    path: RequestInfo,
    options: RequestInit
) {
    const response = await fetch(path, options)
    if (!response.ok) throw new Error(response.statusText)
    return response
}
