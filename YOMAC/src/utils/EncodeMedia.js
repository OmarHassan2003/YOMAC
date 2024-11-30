/**
 * Encodes an image or video file to a Base64 string
 * suitable for DRF decode_base64_to_file function.
 * 
 * @param {File} file - The file to encode (image or video).
 * @return {Promise<string>} - A promise that resolves to a Base64 string.
 */
function encodeFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // On successful read
        reader.onload = () => {
            resolve(reader.result); // Base64-encoded string (with prefix)
        };

        // Handle errors
        reader.onerror = (error) => {
            reject(new Error("Failed to encode file to Base64: " + error.message));
        };

        // Read the file as Data URL (Base64 with MIME type prefix)
        reader.readAsDataURL(file);
    });
}

// Usage Example:
const fileInput = document.querySelector("#fileInput"); // Replace with your file input
fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        try {
            const base64String = await encodeFileToBase64(file);
            console.log("Base64 String:", base64String);
        } catch (error) {
            console.error(error.message);
        }
    }
});
