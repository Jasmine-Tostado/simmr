import db from "@/database";
import { StoryLogsInsert } from "@/types";

export const submitStoryLog = async (
  dishImageUri: string,
  recipeId: string,
  userId: string
) => {
  try {
    const dbImageUrl = await storeImageInDb(dishImageUri, recipeId, userId);

    const payload: StoryLogsInsert = {
      recipe_id: recipeId,
      user_id: userId,
      dish_image_url: dbImageUrl,
      date: new Date().toISOString(),
    };

    await db.from("story_logs").insert(payload);
  } catch (error) {
    console.error("Failed to submit story log", error);
  }
};

const storeImageInDb = async (
  dishImageUri: string,
  recipeId: string,
  userId: string
) => {
  try {
    const filename = `${userId}-${recipeId}-${Date.now()}.jpg`;
    const fetchedUri = await fetch(dishImageUri);
    const arrayBuffer = await fetchedUri.arrayBuffer();
    const fileBytes = new Uint8Array(arrayBuffer);

    await db.storage.from("story_log_images").upload(filename, fileBytes, {
      contentType: "image/jpg",
      cacheControl: "3600",
      upsert: false,
    });

    // Get the public URL for the uploaded image
    const { data } = db.storage.from("story_log_images").getPublicUrl(filename);
    return data.publicUrl;
  } catch (error) {
    console.error("Failed to store image in DB", error);
    return null;
  }
};
