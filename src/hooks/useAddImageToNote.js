import { API_URL, AUTH_TOKEN } from "@env";

const useAddImageToNote = () => {
  const addImageToNote = async (notesId, imageUri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "note_image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`${API_URL}/notes/${notesId}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data; // { image_id, thumbnail_image, number_of_images }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return { addImageToNote };
};

export default useAddImageToNote;
